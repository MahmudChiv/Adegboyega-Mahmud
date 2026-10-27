import { NextResponse } from "next/server";

export async function GET() {
  const username = "mahmud_chiv";

  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
        allQuestionsCount {
          difficulty
          count
        }
      }
    `;

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      // Revalidate every 60 seconds for live freshness
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`LeetCode GraphQL error: ${response.status}`);
    }

    const json = await response.json();
    const matchedUser = json?.data?.matchedUser;
    const acSubmissions = matchedUser?.submitStatsGlobal?.acSubmissionNum || [];
    const allQuestions = json?.data?.allQuestionsCount || [];

    const getCount = (diff: string) => {
      const item = acSubmissions.find((s: { difficulty: string; count: number }) => s.difficulty === diff);
      return item ? item.count : 0;
    };

    const getTotal = (diff: string) => {
      const item = allQuestions.find((q: { difficulty: string; count: number }) => q.difficulty === diff);
      return item ? item.count : 0;
    };

    const totalSolved = getCount("All");
    const easySolved = getCount("Easy");
    const mediumSolved = getCount("Medium");
    const hardSolved = getCount("Hard");

    return NextResponse.json({
      success: true,
      username,
      profileUrl: `https://leetcode.com/u/${username}/`,
      totalSolved,
      easy: { solved: easySolved, total: getTotal("Easy") || 974 },
      medium: { solved: mediumSolved, total: getTotal("Medium") || 2135 },
      hard: { solved: hardSolved, total: getTotal("Hard") || 986 },
      ranking: matchedUser?.profile?.ranking || null,
      fetchedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    console.error("Failed to fetch live LeetCode stats:", err);
    // Return graceful fallback so UI never crashes if LeetCode throttles
    return NextResponse.json({
      success: false,
      username,
      profileUrl: `https://leetcode.com/u/${username}/`,
      totalSolved: 3,
      easy: { solved: 3, total: 974 },
      medium: { solved: 0, total: 2135 },
      hard: { solved: 0, total: 986 },
      ranking: null,
      fetchedAt: new Date().toISOString(),
    });
  }
}
