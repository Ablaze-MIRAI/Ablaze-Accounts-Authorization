import Link from "next/link";

export const ShowAllProjects = () =>{
  return (
    <small className="text-gray-500 w-full flex justify-end hover:underline underline-offset-2">
      <Link href="https://ablaze.one/projects" target="_blank" rel="noopener">すべてのプロジェクト<i className="ri-external-link-line"></i></Link>
    </small>
  );
};
