import { toast } from "sonner";

export async function copyContent(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Code copied!");
  } catch (err) {
    toast.error("Something went wrong!");
  }
}
