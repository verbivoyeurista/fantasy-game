function calculateCompatibility(charA, charB) {
  const traits = ["openness", "conscientiousness", "extraversion", "agreeableness", "neuroticism"];
  let score = 0;
  let notes = [];

  traits.forEach(trait => {
    const a = charA[trait];
    const b = charB[trait];

    if (a === b) {
      // Aligned traits increase compatibility
      score += 1;
      notes.push(`${trait}: aligned`);
    } else {
      // Opposing traits reduce compatibility
      score -= 1;

      // Special cases for dramatic mismatch
      if (trait === "neuroticism") {
        notes.push(`${trait}: one calm, one reactive`);
      } else if (trait === "agreeableness") {
        notes.push(`${trait}: conflict in values`);
      } else {
        notes.push(`${trait}: different styles`);
      }
    }
  });

  return {
    score,
    summary: score >= 3 ? "Great fit" :
             score === 2 ? "Works well" :
             score === 1 ? "Some tension" :
             score === 0 ? "Neutral" :
             score === -1 ? "Strained" :
             "Poor match",
    notes
  };
}
