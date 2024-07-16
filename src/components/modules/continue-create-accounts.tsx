import { FormDescription } from "@/components/ui/form";

export const ContinueCreateAccounts = () =>{
  return (
    <FormDescription>
      作成を続行すると
      <a href="https://docs.ablaze.one/terms_of_use" className="underline" target="_blank" rel="noreferrer noopener">
        <i className="ri-external-link-line"></i>
        利用規約
      </a>
      および
      <a href="https://docs.ablaze.one/privacy_policy" className="underline" target="_blank" rel="noreferrer noopener">
        <i className="ri-external-link-line"></i>
        プライバシーポリシー
      </a>
      に同意したとみなされます
    </FormDescription>
  );
};
