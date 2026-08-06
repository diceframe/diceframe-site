"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type DemoLanguage = "zh" | "en";
type DemoPhase = 0 | 1 | 2 | 3;

const copy = {
  zh: {
    badge: "INTERACTIVE DEMO · NO API",
    back: "返回官网",
    nav: ["总览", "游玩", "角色", "世界书", "记忆", "日志", "规则", "设置"],
    console: "GM 控台 · 单人冒险",
    gameTitle: "沉没回廊 · 试玩桌",
    status: "状态",
    statusValue: "进行中",
    progressLabel: "进度",
    save: "存档",
    saveValue: "仅本地",
    title: "沉没回廊",
    subtitle: "一段约 3 分钟的 DiceFrame 交互试玩",
    local: "预设剧情 · 本地运行",
    reset: "重新开始",
    round: "回合",
    phase: "阶段",
    phaseValue: ["探索", "等待检定", "状态结算", "场景推进"],
    mode: "模式",
    modeValue: "单人冒险",
    players: "玩家",
    scene: "当前场景",
    character: "角色状态",
    characterName: "伊莱莎 · 旧港调查员",
    hp: "生命",
    sanity: "意志",
    currency: "银币",
    attributes: ["观察 14", "学识 12", "敏捷 11"],
    inventory: "装备与物品",
    inventoryItems: ["铜制钥匙", "提灯", "短剑"],
    clueTitle: "已发现线索",
    clueEmpty: "尚未发现",
    clue: "潮汐符文拓片",
    lorebook: "世界书",
    loreEntries: [
      ["沉没回廊", "旧港地下被海水侵蚀的祭祀通道。"],
      ["潮汐教团", "信奉月相与深海回声的失落教团。"],
    ],
    gm: "GM · 第 {round} 回合",
    initial:
      "门后的风带着潮湿的铁锈味。伊莱莎举高提灯，墙上的符文没有反光——它们正随着远处的潮声缓慢呼吸。",
    actionLabel: "伊莱莎",
    actions: ["靠近石门，检查符文的排列", "用提灯照亮地面的水痕"],
    actionFallback: "靠近石门，检查符文的排列",
    checkTitle: "观察检定",
    checkHint: "这次行动需要一次 D20 检定",
    roll: "掷 D20",
    rolling: "骰子滚动中…",
    rollResult: "D20 = 17",
    success: "成功",
    successNarration:
      "符文并非刻在石头上，而是由盐晶沿着旧有裂缝生长而成。你在最低处找到一枚与铜钥匙齿纹相同的月牙凹槽。",
    stateChange: "状态变化",
    stateLines: ["获得线索 · 潮汐符文拓片", "世界书命中 · 潮汐教团"],
    nextActions: ["将铜钥匙插入月牙凹槽", "记录符文后，沿回廊继续探索"],
    finalActionFallback: "将铜钥匙插入月牙凹槽",
    finalNarration:
      "钥匙转动时，整条回廊的盐晶同时熄灭。石门向内退去，露出一座被星光照亮的祭室——而你很确定，地底不该看得见天空。",
    finalStateLines: ["场景变化 · 观星祭室", "消耗物品 · 铜制钥匙"],
    composer: "描述你的行动",
    composerHint: "试玩版使用预设行动，正式版支持自然语言输入。",
    completeTitle: "试玩完成",
    complete:
      "你刚刚体验了 DiceFrame 的行动、检定、叙事与状态同步流程。正式版会由你配置的 AI GM 生成后续故事。",
    download: "获取 DiceFrame",
    docs: "查看部署文档",
    privacy: "此试玩不会连接模型、上传内容或保存游戏数据。",
  },
  en: {
    badge: "INTERACTIVE DEMO · NO API",
    back: "Official site",
    nav: ["Overview", "Play", "Characters", "Lorebook", "Memory", "Logs", "Rules", "Settings"],
    console: "GM Console · Solo Adventure",
    gameTitle: "Sunken Gallery · Demo Table",
    status: "Status",
    statusValue: "Active",
    progressLabel: "Progress",
    save: "Save",
    saveValue: "Local only",
    title: "The Sunken Gallery",
    subtitle: "A three-minute interactive DiceFrame preview",
    local: "Scripted story · Runs locally",
    reset: "Restart",
    round: "Round",
    phase: "Phase",
    phaseValue: ["Explore", "Awaiting check", "Resolving state", "Scene advance"],
    mode: "Mode",
    modeValue: "Solo adventure",
    players: "Players",
    scene: "Current scene",
    character: "Character status",
    characterName: "Eliza · Old Harbor Investigator",
    hp: "Health",
    sanity: "Resolve",
    currency: "Silver",
    attributes: ["Observe 14", "Lore 12", "Agility 11"],
    inventory: "Equipment and inventory",
    inventoryItems: ["Copper key", "Lantern", "Short sword"],
    clueTitle: "Discovered clues",
    clueEmpty: "None yet",
    clue: "Tidal rune rubbing",
    lorebook: "Lorebook",
    loreEntries: [
      ["Sunken Gallery", "A ritual passage beneath the old harbor, eroded by seawater."],
      ["Order of the Tide", "A lost order devoted to lunar cycles and echoes from the deep."],
    ],
    gm: "GM · Round {round}",
    initial:
      "The wind beyond the door carries the scent of wet iron. Eliza raises her lantern. The runes do not reflect the light—they breathe with the distant tide.",
    actionLabel: "Eliza",
    actions: ["Approach the stone door and study the runes", "Raise the lantern and inspect the watermarks"],
    actionFallback: "Approach the stone door and study the runes",
    checkTitle: "Observation check",
    checkHint: "This action requires a D20 check",
    roll: "Roll D20",
    rolling: "Rolling…",
    rollResult: "D20 = 17",
    success: "Success",
    successNarration:
      "The runes were not carved into the stone. Salt crystals grew along older cracks. At the lowest point, you find a crescent-shaped recess matching the teeth of your copper key.",
    stateChange: "State changes",
    stateLines: ["Clue gained · Tidal rune rubbing", "Lorebook matched · Order of the Tide"],
    nextActions: ["Insert the copper key into the crescent recess", "Record the runes and continue down the gallery"],
    finalActionFallback: "Insert the copper key into the crescent recess",
    finalNarration:
      "As the key turns, every salt crystal in the gallery goes dark. The stone door withdraws, revealing a shrine filled with starlight—and you are certain the sky should not be visible underground.",
    finalStateLines: ["Scene changed · Astral Shrine", "Item consumed · Copper key"],
    composer: "Describe your action",
    composerHint: "This preview uses scripted choices. The full version accepts natural language.",
    completeTitle: "Demo complete",
    complete:
      "You just experienced DiceFrame's action, check, narration, and state-sync loop. In the full version, your configured AI GM continues the story.",
    download: "Get DiceFrame",
    docs: "Deployment guide",
    privacy: "This demo never contacts a model, uploads content, or stores campaign data.",
  },
} as const;

export function DemoExperience({ language }: { language: DemoLanguage }) {
  const t = copy[language];
  const [phase, setPhase] = useState<DemoPhase>(0);
  const [firstAction, setFirstAction] = useState("");
  const [finalAction, setFinalAction] = useState("");
  const [busy, setBusy] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [railOpen, setRailOpen] = useState(false);

  const scene = phase === 3
    ? language === "zh"
      ? "观星祭室"
      : "Astral Shrine"
    : t.title;
  const hp = phase === 3 ? 12 : 14;
  const progress = phase === 0 ? 1 : phase === 1 ? 2 : 3;
  const inventory = useMemo(
    () => (phase === 3 ? t.inventoryItems.filter((item) => item !== t.inventoryItems[0]) : t.inventoryItems),
    [phase, t.inventoryItems],
  );

  function chooseFirst(action: string) {
    if (busy) return;
    setFirstAction(action);
    setBusy(true);
    window.setTimeout(() => {
      setPhase(1);
      setBusy(false);
    }, 520);
  }

  function rollDice() {
    if (rolling) return;
    setRolling(true);
    window.setTimeout(() => {
      setRolling(false);
      setPhase(2);
    }, 1050);
  }

  function chooseFinal(action: string) {
    if (busy) return;
    setFinalAction(action);
    setBusy(true);
    window.setTimeout(() => {
      setPhase(3);
      setBusy(false);
    }, 720);
  }

  function reset() {
    setPhase(0);
    setFirstAction("");
    setFinalAction("");
    setBusy(false);
    setRolling(false);
    setRailOpen(false);
  }

  return (
    <section className="demo-shell" lang={language === "en" ? "en" : "zh-CN"}>
      <nav className="demo-app-nav" aria-label="DiceFrame">
        <Link className="demo-app-brand" href={language === "en" ? "/en" : "/"}>
          <Image src="/diceframe-logo.svg" alt="" width={34} height={34} />
          <span><strong>DiceFrame</strong><small>{t.back}</small></span>
        </Link>
        <div className="demo-app-tabs">
          {t.nav.map((label, index) => (
            <span className={index === 1 ? "active" : ""} key={label}>
              <i aria-hidden="true">{["⌂", "♙", "♧", "◇", "◌", "▤", "☷", "⚙"][index]}</i>
              {label}
            </span>
          ))}
        </div>
        <div className="demo-app-actions">
          <Link href={language === "en" ? "/demo" : "/en/demo"}>
            {language === "en" ? "中文" : "EN"}
          </Link>
          <span><i /> DEMO</span>
        </div>
      </nav>

      <header className="demo-hud">
        <Link className="demo-back" href={language === "en" ? "/en" : "/"} aria-label={t.back}>←</Link>
        <div className="demo-hud-title">
          <span>{t.console}</span>
          <h1>{t.gameTitle}</h1>
          <p>{scene} · {t.round} {phase + 1}</p>
        </div>
        <div className="demo-hud-stats">
          <div><strong>{t.statusValue}</strong><small>{t.status}</small></div>
          <div><strong>{progress} / 3</strong><small>{t.progressLabel}</small></div>
          <div><strong>{t.saveValue}</strong><small>{t.save}</small></div>
        </div>
        <div className="demo-hud-actions">
          <button type="button" onClick={reset}>{t.reset}</button>
        </div>
      </header>

      <div className="demo-board">
        <div className={`demo-grid ${railOpen ? "rail-open" : ""}`}>
          <aside className="demo-character-panel">
            <div className="demo-panel-title">
              <span>CHARACTER</span>
              <strong>{t.character}</strong>
            </div>
            <h2>{t.characterName}</h2>
            <div className="demo-resource">
              <div><span>{t.hp}</span><strong>{hp} / 14</strong></div>
              <div className="demo-resource-bar"><i style={{ width: `${(hp / 14) * 100}%` }} /></div>
            </div>
            <div className="demo-resource">
              <div><span>{t.sanity}</span><strong>11 / 12</strong></div>
              <div className="demo-resource-bar resolve"><i style={{ width: "92%" }} /></div>
            </div>
            <div className="demo-stat-chips">
              {t.attributes.map((item) => <span key={item}>{item}</span>)}
              <span>{t.currency} 8</span>
            </div>
            <div className="demo-inventory">
              <strong>{t.inventory}</strong>
              <ul>
                {inventory.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="demo-clue">
              <strong>{t.clueTitle}</strong>
              <span className={phase >= 2 ? "found" : ""}>
                {phase >= 2 ? t.clue : t.clueEmpty}
              </span>
            </div>
          </aside>

          <div className="demo-play-column">
            <header className="demo-scene-strip">
              <div>
                <span>{t.scene}</span>
                <h2>{scene}</h2>
              </div>
              <div>
                <span>{t.round} {phase + 1}</span>
                <span>{t.phaseValue[phase]}</span>
                <span>{t.modeValue}</span>
              </div>
            </header>
            <div className="demo-timeline-wrap">
              <div className="demo-timeline" aria-live="polite">
              <div className="demo-round-divider">{t.round} 1</div>
              <article className="demo-message gm">
                <strong>{t.gm.replace("{round}", "1")}</strong>
                <p>{t.initial}</p>
              </article>

              {phase >= 1 && (
                <article className="demo-message player">
                  <strong>{t.actionLabel}</strong>
                  <p>{firstAction || t.actionFallback}</p>
                </article>
              )}

              {phase === 1 && (
                <article className="demo-check-card">
                  <div>
                    <span>CHECK</span>
                    <strong>{t.checkTitle}</strong>
                    <small>{t.checkHint}</small>
                  </div>
                  <button type="button" onClick={rollDice} disabled={rolling}>
                    {rolling ? t.rolling : t.roll}
                  </button>
                </article>
              )}

              {phase >= 2 && (
                <>
                  <article className="demo-check-result">
                    <span>🎲</span>
                    <div>
                      <strong>{t.rollResult}</strong>
                      <small>{t.checkTitle} · {t.success}</small>
                    </div>
                  </article>
                  <article className="demo-message gm">
                    <strong>{t.gm.replace("{round}", "2")}</strong>
                    <p>{t.successNarration}</p>
                    <div className="demo-state-card">
                      <strong>{t.stateChange}</strong>
                      {t.stateLines.map((line) => <span key={line}>{line}</span>)}
                    </div>
                  </article>
                </>
              )}

              {phase >= 3 && (
                <>
                  <article className="demo-message player">
                    <strong>{t.actionLabel}</strong>
                    <p>{finalAction || t.finalActionFallback}</p>
                  </article>
                  <article className="demo-message gm">
                    <strong>{t.gm.replace("{round}", "3")}</strong>
                    <p>{t.finalNarration}</p>
                    <div className="demo-state-card warning">
                      <strong>{t.stateChange}</strong>
                      {t.finalStateLines.map((line) => <span key={line}>{line}</span>)}
                    </div>
                  </article>
                </>
              )}

              {busy && (
                <div className="demo-thinking">
                  <i /><i /><i />
                </div>
              )}
              </div>
            </div>

            <div className="demo-composer">
              {phase === 0 && (
                <>
                  <div>
                    <strong>{t.composer}</strong>
                    <span>{t.composerHint}</span>
                  </div>
                  <div className="demo-choices">
                    {t.actions.map((action) => (
                      <button type="button" onClick={() => chooseFirst(action)} disabled={busy} key={action}>
                        {action}<span>→</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {phase === 1 && (
                <div className="demo-composer-wait">
                  <span>🎲</span>
                  <strong>{t.checkHint}</strong>
                </div>
              )}
              {phase === 2 && (
                <>
                  <div>
                    <strong>{t.composer}</strong>
                    <span>{t.composerHint}</span>
                  </div>
                  <div className="demo-choices">
                    {t.nextActions.map((action) => (
                      <button type="button" onClick={() => chooseFinal(action)} disabled={busy} key={action}>
                        {action}<span>→</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {phase === 3 && (
                <div className="demo-complete">
                  <div>
                    <strong>{t.completeTitle}</strong>
                    <p>{t.complete}</p>
                  </div>
                  <div>
                    <a href="https://github.com/diceframe/diceframe/releases/latest" target="_blank" rel="noreferrer">
                      {t.download} ↗
                    </a>
                    <Link href={language === "en" ? "/en/docs?doc=docker" : "/docs?doc=docker"}>
                      {t.docs} →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className={`demo-lore-panel ${railOpen ? "" : "collapsed"}`}>
            <button
              className="demo-rail-toggle"
              type="button"
              onClick={() => setRailOpen((value) => !value)}
              aria-label={t.lorebook}
            >
              {railOpen ? "›" : "‹"}
            </button>
            <div className="demo-rail-content">
              <div className="demo-panel-title">
                <span>LOREBOOK</span>
                <strong>{t.lorebook}</strong>
              </div>
              {t.loreEntries.map(([name, description], index) => (
                <article className={index === 1 && phase < 2 ? "locked" : ""} key={name}>
                  <span>0{index + 1}</span>
                  <strong>{index === 1 && phase < 2 ? "••••••" : name}</strong>
                  <p>{index === 1 && phase < 2 ? "—" : description}</p>
                </article>
              ))}
              <div className="demo-no-api">
                <i />
                <p>{t.privacy}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
