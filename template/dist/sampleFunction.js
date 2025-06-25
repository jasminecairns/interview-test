/**
 * processEntries
 * --------------
 * PURE function — no IO, no mutation, deterministic.
 */
export function processEntries(entries) {
    const tagFrequencies = {};
    for (const e of entries) {
        for (const tag of e.tags_user) {
            tagFrequencies[tag] = (tagFrequencies[tag] || 0) + 1;
        }
    }
    return {
        summary: `Analysed ${entries.length} entries`,
        tagFrequencies,
    };
}
export default processEntries;
