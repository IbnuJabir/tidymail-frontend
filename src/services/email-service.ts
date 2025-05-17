import api from "@/lib/api";
import { CheckoutResponse, PortalResponse } from "@/types/checkout";
import { EmailAnalyticsResponse } from "@/types/dashboard";
import type {
  Email,
  SubscriptionResponse,
  GetSubscriptionsResponse,
  AnalysisBatchResult,
} from "@/types/email";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface EmailResponse {
  status: string;
  message: string;
  data: Email[];
}

export async function fetchEmails(): Promise<{
  data: Email[];
  page: number;
  limit: number;
  total_count: number;
}> {
  try {
    const response = await api.get<EmailResponse>("/email/emails");

    return {
      data: response.data.data,
      page: 1,
      limit: 10,
      total_count: response.data.data.length,
    };
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error;
  }
}

/**
 * Analyzes a single batch of subscriptions from the user's inbox
 * @param pageToken Optional token for pagination
 * @param batchSize Number of emails to process in this batch
 * @returns Results of the batch analysis
 */
export async function analyzeSubscriptionBatch(
  pageToken?: string | null,
  batchSize = 100, // Increased batch size for better performance
  fresh_analysis?: boolean
): Promise<AnalysisBatchResult> {
  try {
    let url = "/subscription/analyze-subscriptions";
    // Add query parameters if provided
    const params = new URLSearchParams();
    if (pageToken) {
      params.append("page_token", pageToken);
    }
    params.append("batch_size", batchSize.toString());
    params.append("fresh_analysis", fresh_analysis ? "true" : "false");
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    const response = await api.post(url);
    return response.data;
  } catch (error) {
    console.error("Error analyzing subscription batch:", error);
    throw error;
  }
}

/**
 * Optimized version that processes multiple batches in parallel
 * Use this when you want to speed up processing with parallel requests
 * @param pageTokens Array of page tokens to process in parallel
 * @param batchSize Number of emails to process in each batch
 * @returns Combined results from all batches
 */
export async function analyzeSubscriptionParallel(
  pageTokens: (string | null)[],
  batchSize = 100
): Promise<{
  totalProcessed: number;
  totalNewSubscriptions: number;
  nextPageTokens: (string | null)[];
  allComplete: boolean;
}> {
  try {
    // Process all batches in parallel
    const results = await Promise.all(
      pageTokens.map((token) => analyzeSubscriptionBatch(token, batchSize))
    );

    // Combine results
    const combinedResult = {
      totalProcessed: 0,
      totalNewSubscriptions: 0,
      nextPageTokens: [] as (string | null)[],
      allComplete: true,
    };

    results.forEach((result) => {
      combinedResult.totalProcessed += result.data.processed_count;
      combinedResult.totalNewSubscriptions += result.data.new_subscriptions;

      if (!result.data.is_complete) {
        combinedResult.allComplete = false;
        if (result.data.next_page_token) {
          combinedResult.nextPageTokens.push(result.data.next_page_token);
        }
      }
    });

    return combinedResult;
  } catch (error) {
    console.error("Error in parallel subscription analysis:", error);
    throw error;
  }
}
export async function getSubscriptions(
  queryParams?: string
): Promise<GetSubscriptionsResponse> {
  try {
    let url = "/subscription/get-subscriptions?status=active";

    if (queryParams) {
      if (!queryParams.includes("status=")) {
        url += `&${queryParams}`;
      } else {
        url = `/subscription/get-subscriptions?${queryParams}`;
      }
    }

    const response = await api.get<SubscriptionResponse>(url);

    return {
      data: response.data.data,
      totalCount: response.data.total,
      totalPages: response.data.pages,
      page: response.data.page,
      limit: response.data.limit,
    };
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw error;
  }
}

export async function getUnsubscribedEmails(
  queryParams?: string
): Promise<GetSubscriptionsResponse> {
  try {
    let url = "/subscription/get-subscriptions?status=unsubscribed";
    if (queryParams) {
      if (!queryParams.includes("status=")) {
        url += `&${queryParams}`;
      } else {
        url = `/subscription/get-subscriptions?${queryParams}`;
      }
    }

    const response = await api.get<SubscriptionResponse>(url);

    return {
      data: response.data.data,
      totalCount: response.data.total,
      totalPages: response.data.pages,
      page: response.data.page,
      limit: response.data.limit,
    };
  } catch (error) {
    console.error("Error fetching Unsubscribed Addresses:", error);
    throw error;
  }
}

export async function bulkTrash(
  emails: string | string[],
  keepStarred = false
) {
  try {
    let url = "/email/bulk-trash";
    // Add keep_starred as a URL parameter
    if (keepStarred) {
      url += `?keep_starred=true`;
    }

    let response;
    if (typeof emails === "string") {
      response = await api.post(url, { emails: [emails] });
    } else if (Array.isArray(emails) && emails.length > 0) {
      response = await api.post(url, { emails });
    } else {
      throw new Error("No emails provided for bulk trash.");
    }

    return response.data;
  } catch (error) {
    console.error("Error moving emails to trash:", error);
    throw error;
  }
}

export async function bulkDelete(
  email: string | string[],
  keepStarred = false
) {
  try {
    let url = "/email/bulk-delete";
    // Add keep_starred as a URL parameter
    if (keepStarred) {
      url += `?keep_starred=true`;
    }

    let response;
    if (typeof email === "string") {
      response = await api.post(url, { emails: [email] });
    } else if (Array.isArray(email) && email.length > 0) {
      response = await api.post(url, { emails: email });
    } else {
      throw new Error("No emails provided for bulk delete.");
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting emails:", error);
    throw error;
  }
}

export async function unsubscribe(email: string) {
  try {
    const response = await api.post("/subscription/unsubscribe", { email });
    return response.data;
  } catch (error) {
    console.error("Error unsubscribing:", error);
    throw error;
  }
}

export async function subscribeBack(email: string) {
  try {
    const response = await api.post("/subscription/subscribe-back", { email });
    return response.data;
  } catch (error) {
    console.error("Error resubscribing:", error);
    throw error;
  }
}

export async function fetchEmailAnalytics(): Promise<EmailAnalyticsResponse> {
  try {
    const response = await api.get<EmailAnalyticsResponse>("/analytics");
    return response.data;
  } catch (error) {
    console.error("Error fetching email analytics:", error);
    throw new Error("Failed to fetch email analytics data");
  }
}

const checkout = async (plan_keys: string[]): Promise<CheckoutResponse> => {
  try {
    const response = await api.post("/subscription-plan/checkout", {
      plan_keys,
      success_url: `${process.env.NEXT_PUBLIC_SUCCESS_URL}/payment/success`,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error("Failed to create checkout session");
  }
};

export const useCheckout = () => {
  return useMutation({
    mutationFn: checkout,
    onSuccess: (data) => {
      window.location.href = data.checkout_url;
    },
    onError: (error) => {
      console.error("Checkout Error:", error);
    },
  });
};

// create billing portal session
const createBillingPortalSession = async (): Promise<PortalResponse> => {
  try {
    const response = await api.get("/subscription-plan/billing-portal");
    return response.data;
  } catch (error) {
    console.error("Error creating billing portal session:", error);
    throw new Error("Failed to create billing portal session");
  }
};
export const useCreateBillingPortalSession = () => {
  return useMutation({
    mutationFn: createBillingPortalSession,
    onSuccess: (data) => {
      console.log("Billing Portal URL:", data.portal_url);
      window.location.href = data.portal_url;
    },
    onError: (error) => {
      console.error("Billing Portal Error:", error);
    },
  });
};

const sendContactMessage = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await api.post("/contact/feedback", formData);
    return response.data;
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw new Error("Failed to send contact message");
  }
};
export const useSendContactMessage = () => {
  return useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      toast.success("Message sent!", {
        description: "We'll get back to you as soon as possible.",
      });
      console.log("Contact message sent successfully");
    },
    onError: (error) => {
      toast.error("Something went wrong", {
        description: `${error}Please try again later.`,
      });
      console.error("Contact message error:", error);
    },
  });
};

export const sendEnterpriseRequest = async (formData: {
  name: string;
  email: string;
  company: string;
  employees: string;
  message: string;
}) => {
  try {
    const response = await api.post("/contact/enterprise", formData);
    return response.data;
  } catch (error) {
    console.error("Error sending enterprise request:", error);
    throw new Error("Failed to send enterprise request");
  }
};
