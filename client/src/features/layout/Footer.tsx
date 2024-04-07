import { FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="footer bg-base-100 text-base-content flex justify-center w-full flex-col items-center py-4 font-semibold gap-2">
      <p className="text-center">Made with ❤️ in Birmingham, AL</p>
      <a
        href="https://github.com/Birmingham-AI/conversation-partner"
        target="_blank"
      >
        <FaGithub className="opacity-65 text-3xl" />
      </a>
    </footer>
  );
}
