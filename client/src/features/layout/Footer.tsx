import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Footer() {
  const iconClasses = "opacity-65 text-2xl";

  return (
    <footer className="footer bg-base-200 text-base-content flex justify-center w-full flex-col items-center py-3 font-semibold gap-2">
      <p className="text-center">Made with ❤️ in Birmingham, AL</p>
      <div className="flex gap-3 items-baseline">
        <a
          href="https://github.com/Birmingham-AI/conversation-partner"
          target="_blank"
        >
          <FaGithub className={iconClasses} />
        </a>
        <a
          href="https://www.linkedin.com/company/birmingham-ai/"
          target="_blank"
        >
          <FaLinkedin className={iconClasses} />
        </a>
      </div>
    </footer>
  );
}
