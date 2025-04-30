import api from "@/lib/api";
import { Email, Subscription, SubscriptionResponse, GetSubscriptionsResponse } from "@/types/email";

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

export async function analyseSubcription() {
  try {
    const response = await api.get("/subscription/analyze-subscriptions");
    return response.data;
  } catch (error) {
    console.error("Error analysing subscription:", error);
    throw error;
  }
}

export async function getSubscriptions(queryParams?: string): Promise<GetSubscriptionsResponse> {
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

export async function getUnsubscribedEmails(queryParams?: string): Promise<GetSubscriptionsResponse> {
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

export async function bulkTrash(email: string) {
  try {
    const response = await api.post("/email/bulk-trash", { emails: [email] });
    return response.data;
  } catch (error) {
    console.error("Error moving emails to trash:", error);
    throw error;
  }
}

export async function bulkDelete(email: string) {
  try {
    const response = await api.post("/email/bulk-delete", { emails: [email] });
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
