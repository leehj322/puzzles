"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { formatTime } from "@puzzles/core";

import { Link } from "@/shared/i18n/navigation";
import { Button, buttonClass } from "@/shared/ui/button";
import { Modal } from "@/shared/ui/modal";

import { useSlidingStore } from "../model/sliding-store";

export function SlidingWinModal() {
  const t = useTranslations("puzzlePlay");
  const tCommon = useTranslations("common");
  const finishedAt = useSlidingStore((s) => s.finishedAt);
  const startedAt = useSlidingStore((s) => s.startedAt);
  const moves = useSlidingStore((s) => s.moves);
  const reset = useSlidingStore((s) => s.reset);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!finishedAt) setDismissed(false);
  }, [finishedAt]);

  const open = Boolean(finishedAt && startedAt) && !dismissed;
  const duration = finishedAt && startedAt ? finishedAt - startedAt : 0;

  return (
    <Modal
      open={open}
      onClose={() => setDismissed(true)}
      labelledBy="sliding-win-title"
      closeLabel={tCommon("close")}
    >
      <p className="font-mono text-mono uppercase text-fg-muted">WELL DONE</p>
      <h2 id="sliding-win-title" className="font-sans text-h3">
        {t("won")}
      </h2>
      <p className="font-sans text-body text-fg-muted">
        {t("wonDesc", { moves, time: formatTime(duration) })}
      </p>
      <div className="mt-2 flex gap-2">
        <Button onClick={reset}>{tCommon("reset")}</Button>
        <Link
          href="/browse/sliding"
          className={buttonClass({ variant: "outlined" })}
        >
          {t("toList")}
        </Link>
      </div>
    </Modal>
  );
}
