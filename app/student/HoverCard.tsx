import {
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger
} from "@radix-ui/themes";
import React from "react";
import { CiCircleInfo } from "react-icons/ci";

const HoverCardIdea = () => {
  return (
    <>
      <p className="mt-2 pt-1">
        {" "}
        Future you will thank you! Taking a peek at the terms and services saves
        you time (and maybe a headache) later.{" "}
      </p>
      <HoverCardRoot>
        <HoverCardTrigger>
          <p className="text-gray-800 font-medium  flex items-center gap-1 cursor-help">
            {" "}
            Terms of Services <CiCircleInfo />{" "}
          </p>
        </HoverCardTrigger>
        <HoverCardContent className="HoverCardContent w-4/5" sideOffset={5}>
          <ul className="list-disc p-2">
            <li>
              Got a gremlin in your gears? This system is for reporting real
              issues, so we can fix them faster than you can say bug squasher!
            </li>
            <li>
              Hold your horses! We ❤ feedback, but keep it clean and concise.
              Excessive complaints, insults, or anything that makes us want to
              facepalm might lead to a temporary account nap.
            </li>
            <li>
              Deja vu complaints? We got it the first time! Duplicates slow down
              our detective work, so hold off on sending the same message twice
            </li>
          </ul>
        </HoverCardContent>
      </HoverCardRoot>
    </>
  );
};

export default HoverCardIdea;
