export const QUEUE_NAMES = {
  DOCUMENT_INGESTION: "document-ingestion",
  DOCUMENT_REINDEX: "document-reindex",
  NOTIFICATIONS: "notifications",
  ANALYTICS: "analytics",
} as const;

export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];
