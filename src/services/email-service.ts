import api from "@/lib/api";
import {
  Email,
  SubscriptionResponse,
  GetSubscriptionsResponse,
  AnalysisBatchResult,
} from "@/types/email";

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

export async function analyzeSubscriptionBatch(
  pageToken?: string | null,
  batchSize: number = 70
): Promise<AnalysisBatchResult> {
  try {
    let url = "/subscription/analyze-subscriptions";

    // Add query parameters if provided
    const params = new URLSearchParams();
    if (pageToken) {
      params.append("page_token", pageToken);
    }
    params.append("batch_size", batchSize.toString());

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error analyzing subscription batch:", error);
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

export async function bulkTrash(emails: string | string[]) {
  try {
    let response;
    if (typeof emails === "string") {
      response = await api.post("/email/bulk-trash", { emails: [emails] });
    } else if (Array.isArray(emails) && emails.length > 0) {
      response = await api.post("/email/bulk-trash", { emails });
    } else {
      throw new Error("No emails provided for bulk trash.");
    }

    return response.data;
  } catch (error) {
    console.error("Error moving emails to trash:", error);
    throw error;
  }
}

export async function bulkDelete(email: string | string[]) {
  try {
    let response;

    if (typeof email === "string") {
      response = await api.post("/email/bulk-delete", { emails: [email] });
    } else if (Array.isArray(email) && email.length > 0) {
      response = await api.post("/email/bulk-delete", { emails: email });
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
