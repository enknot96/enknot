export type NowProduct = {
  name: string;
  description: string;
  iconSrc: string;
  url: string;
  metric: string;
  launchedAt?: string;
};

export const X_URL = "https://x.com/enknot96";

export const nowProducts: NowProduct[] = [
  {
    name: "ShoText!",
    description:
      "Drag to select any area on a page, and it's copied to your clipboard via local OCR — nothing leaves your browser.",
    iconSrc: "/now/shotext.png",
    url: "https://chromewebstore.google.com/detail/%E3%82%B7%E3%83%A7%E3%83%83%E3%83%86%E3%82%AD%EF%BC%81-shotext%EF%BC%81/gpfjbnfccfhfnbafdkadhckfnjdpfcpm",
    metric: "-",
  },
  {
    name: "Koko Soko",
    description:
      "Scrolling capture that stitches a selected area or the whole page into one seamless PNG, fully in-browser.",
    iconSrc: "/now/kokosoko.png",
    url: "https://chromewebstore.google.com/detail/hobllnakplgdhgkjdanilcgplbpanbcm",
    metric: "-",
  },
];
