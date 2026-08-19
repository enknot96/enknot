export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const dns = await import("dns");
    // このMacのネットワークがNAT64(IPv6のみ)環境のため、AAAAレコード優先だと
    // next/imageの取得先ホストが private ip と誤検知され画像最適化が400になる。
    // IPv4を優先させて回避する。
    dns.setDefaultResultOrder("ipv4first");
  }
}
