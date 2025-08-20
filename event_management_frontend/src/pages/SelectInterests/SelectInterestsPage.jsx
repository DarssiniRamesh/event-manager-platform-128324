import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SelectInterestsPage.module.css';
import '../../styles/common.css';

/**
 * SelectInterests screen:
 * - Multi-select chips toggled via aria-pressed (stateful)
 * - Back button navigates -1
 * - Save button logs selected chips
 */
// PUBLIC_INTERFACE
export default function SelectInterestsPage() {
  const navigate = useNavigate();

  const categories = useMemo(
    () => ({
      Music: ['Concerts', 'Music Festivals', 'Music Workshops', 'DJ Nights'],
      'Arts & Culture': ['Art Exhibitions', 'Cultural Festivals', 'Theater Plays', 'Dance Performances'],
      'Food & Drink': ['Food Festivals', 'Wine Tastings', 'Cooking Classes', 'Beer Festivals'],
      'Sports & Fitness': ['Marathons', 'Yoga Sessions', 'Fitness Workshops', 'Sporting Events'],
      'Business & Networking': ['Conferences', 'Seminars', 'Workshops', 'Networking Events'],
      'Family & Kids': ['Family-Friendly Events', 'Children’s Workshops', 'Kid-Friendly Shows', 'Educational Activities'],
      Technology: ['Tech Conferences', 'Hackathons', 'Startup Events', 'Gadget Expos'],
      'Comedy & Entertainment': ['Stand-up Comedy', 'Improv Nights', 'Comedy Festivals', 'Magic Shows'],
      'Charity & Causes': ['Fundraising Events', 'Charity Galas', 'Benefit Concerts', 'Auctions & Fundraisers'],
      'Education & Learning': ['Lectures & Talks', 'Workshops', 'Educational Seminars', 'Skill-Building Sessions'],
      'Travel & Adventures': ['City Tours', 'Adventure Travel', 'Cultural Experiences', 'Cruise Vacations'],
    }),
    []
  );

  const [selected, setSelected] = useState(() => {
    // preselect initial as per HTML had aria-pressed=true for first rows
    const init = {};
    Object.keys(categories).forEach((k) => {
      init[k] = new Set(categories[k]); // default select all to mimic sample
    });
    return init;
  });

  const toggleChip = (cat, chip) => {
    setSelected((prev) => {
      const next = { ...prev, [cat]: new Set(prev[cat]) };
      if (next[cat].has(chip)) next[cat].delete(chip);
      else next[cat].add(chip);
      return next;
    });
  };

  const save = () => {
    const picks = [];
    Object.entries(selected).forEach(([cat, set]) => {
      if (set.size) picks.push(...Array.from(set).map((s) => `${cat}:${s}`));
    });
    // eslint-disable-next-line no-console
    console.log('Saved interests: ' + (picks.join(', ') || 'None'));
  };

  return (
    <main className={styles.screen} aria-label="Select Interests">

      <button className={styles.backBtn} aria-label="Go back" onClick={() => navigate(-1)}>
        <span className={styles.backIcon} aria-hidden="true" />
      </button>

      <h1 className={styles.title}>Share your interests with us</h1>
      <p className={styles.subtitle}>Choose your interests below to get personalized event suggestions.</p>

      <div className={styles.categoryBlock}>
        {Object.entries(categories).map(([cat, chips]) => (
          <section key={cat} className="category" aria-labelledby={`cat-${cat}`}>
            <h2 id={`cat-${cat}`} className={styles.categoryTitle}>{cat}</h2>
            <div className={styles.chips} role="group" aria-label={`${cat} interests`}>
              {chips.map((chip) => {
                const pressed = selected[cat]?.has(chip);
                return (
                  <button
                    key={chip}
                    className={`${styles.chip} ${pressed ? styles.chipPressed : ''}`}
                    data-chip={chip}
                    aria-pressed={pressed ? 'true' : 'false'}
                    onClick={() => toggleChip(cat, chip)}
                  >
                    {chip}
                    {pressed && <span className={styles.chipX} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
            <hr className={styles.hrLocal} />
          </section>
        ))}
      </div>

      <div className={styles.saveWrap}>
        <button id="btn-save-interests" className={styles.saveBtn} onClick={save}>Save my Interests</button>
      </div>
    </main>
  );
}
