import { useEffect, useState } from "react";
import clsx from "clsx";
import { FaPlay } from "react-icons/fa";
import { VscRobot } from "react-icons/vsc";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { useTextToAudio } from "@/features/conversation";

export type BotChatAudioAvatarProps = {
  onAudioPlay: (audio: HTMLAudioElement) => void;
  isAudioPlaying: boolean;
  audioText: string;
};

export function BotChatAudioAvatar({
  onAudioPlay,
  isAudioPlaying,
  audioText,
}: BotChatAudioAvatarProps) {
  const [isAudioPlaySource, setIsAudioPlaySource] = useState(false);
  const { data: audio, isError } = useTextToAudio(audioText);
  const isAudioDisabled = !audio || isAudioPlaying || isError;

  // Reset the state once the audio is done playing:
  useEffect(() => {
    if (!isAudioPlaying) {
      setIsAudioPlaySource(false);
    }
  }, [isAudioPlaying]);

  const handleAudioPlay = () => {
    audio && onAudioPlay(audio);
    setIsAudioPlaySource(true);
  };

  return (
    <button
      className={clsx(
        "chat-image avatar swap",
        isAudioDisabled
          ? "cursor-default"
          : "group-hover:swap-active hover:opacity-85"
      )}
      role="button"
      disabled={isAudioDisabled}
      onClick={handleAudioPlay}
      aria-label="Play message audio"
    >
      <div className="rounded-full bg-accent p-2 swap-on">
        <FaPlay className="text-accent-content ml-1 mt-1" />
      </div>
      <div className="rounded-full bg-accent p-2 swap-off">
        {isAudioPlaySource ? (
          <HiMiniSpeakerWave className="text-accent-content text-2xl" />
        ) : (
          <VscRobot className="text-accent-content text-2xl" />
        )}
      </div>
    </button>
  );
}
