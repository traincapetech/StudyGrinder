import React, { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Avoid running inside react-snap prerenderer during production build
    const isReactSnap =
      typeof navigator !== "undefined" &&
      navigator.userAgent &&
      navigator.userAgent.includes("ReactSnap");

    if (!isReactSnap) {
      setMounted(true);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[90px] w-[110px]" />
    );
  }

  const counterHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: transparent;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    br { display: none; }
    a { text-decoration: none; }
    .counterimg {
      border-radius: 4px;
      display: block;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <a href='https://www.acadoo.de/leistungen/ghostwriter-doktorarbeit/'>Dissertation Unterstützung</a>
  <script type='text/javascript' src='https://www.freevisitorcounters.com/auth.php?id=df91ff1cb6d43523f27b8fed4d6ea2b02738d4bc'></script>
  <script type="text/javascript" src="https://www.freevisitorcounters.com/en/home/counter/1660348/t/0"></script>
</body>
</html>`;

  return (
    <div className="flex flex-col items-center justify-center my-2 sm:my-0">
      <iframe
        title="Visitor Counter"
        srcDoc={counterHtml}
        width="110"
        height="90"
        className="border-0 overflow-hidden bg-transparent"
        scrolling="no"
        loading="lazy"
      />
    </div>
  );
}
