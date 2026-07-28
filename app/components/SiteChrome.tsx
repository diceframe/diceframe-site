import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <Link className="brand" href="/" aria-label="DiceFrame 首页">
          <Image
            src="/diceframe-logo.svg"
            alt=""
            width={42}
            height={42}
            priority
          />
          <span>
            <strong>DiceFrame</strong>
            <small>AI TABLETOP ENGINE</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="主导航">
          <Link href="/#features">能力</Link>
          <Link href="/#start">快速开始</Link>
          <Link href="/docs">技术帮助</Link>
          <a
            href="https://github.com/diceframe/diceframe"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>

        <a
          className="header-download"
          href="https://github.com/diceframe/diceframe/releases"
          target="_blank"
          rel="noreferrer"
        >
          获取 DiceFrame
          <span aria-hidden="true">↗</span>
        </a>

        <details className="mobile-menu">
          <summary aria-label="打开导航菜单">
            <i />
            <i />
          </summary>
          <nav aria-label="移动端导航">
            <Link href="/#features">能力</Link>
            <Link href="/#start">快速开始</Link>
            <Link href="/docs">技术帮助</Link>
            <a
              href="https://github.com/diceframe/diceframe"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div className="footer-brand">
          <Link className="brand" href="/">
            <Image
              src="/diceframe-logo.svg"
              alt=""
              width={38}
              height={38}
            />
            <span>
              <strong>DiceFrame</strong>
              <small>AI TABLETOP ENGINE</small>
            </span>
          </Link>
          <p>让规则、角色与想象，在你自己的服务器上共同生长。</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>产品</strong>
            <Link href="/#features">核心能力</Link>
            <Link href="/#start">快速开始</Link>
            <Link href="/docs">技术帮助</Link>
          </div>
          <div>
            <strong>社区</strong>
            <a
              href="https://github.com/diceframe/diceframe"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://github.com/diceframe/diceframe/issues"
              target="_blank"
              rel="noreferrer"
            >
              Issues
            </a>
            <span>QQ 群 · 1060613588</span>
          </div>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>© {new Date().getFullYear()} DiceFrame Contributors</span>
        <span>AGPL-3.0 · Open source, self-hosted, community driven.</span>
      </div>
    </footer>
  );
}
