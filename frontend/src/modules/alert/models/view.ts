
export type AlertDetails = {
  message: string;
  status?: "info" | "success" | "error";
  timeout?: number;
  onTimeout?: () => void;
};
