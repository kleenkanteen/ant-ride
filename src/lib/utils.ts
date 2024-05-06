import { toast } from "sonner";

export async function copyContent(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Content copied to clipboard");
    toast.success("Code copied!");
  } catch (err) {
    console.error("Failed to copy: ", err);
    toast.error("Something went wrong!");
  }
}
