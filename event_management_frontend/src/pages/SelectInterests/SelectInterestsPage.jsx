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
      <header className={styles.header} role="banner" aria-label="Header">
        <div className={styles.headerInner}>
          <div className={styles.logoWrap}>
            <div className={styles.logoTicket} aria-hidden="true" />
            <div className={styles.logoText}>Eventify</div>
          </div>

          <nav className={styles.tabs} aria-label="Primary">
            <a href="#" className={styles.tab}>Home</a>
            <a href="#" className={styles.tab}>Events</a>
            <a href="#" className={styles.tab}>About</a>
            <a href="#" className={styles.tab}>Contact</a>
          </nav>

          <div className={styles.headerActions}>
            <button className={styles.headerBtn}>Create Event</button>
            <div className={styles.iconButtons}>
              <button className={styles.iconRoundBtn} aria-label="Tickets" />
              <button className={styles.iconRoundBtn} aria-label="Interested" />
              <div className="profile">
                <button className={styles.profileBtn} aria-haspopup="true" aria-expanded="false">
                  <span className={styles.avatar} aria-hidden="true" />
                  <span className={styles.profileLabel}>Profile</span>
                  <span className={styles.chev} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

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

      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerColumns}>
          <div className="footer-col">
            <div className={styles.footerHeading}>Company Info</div>
            <a href="#" className={styles.footerLink}>About Us</a>
            <a href="#" className={styles.footerLink}>Contact Us</a>
            <a href="#" className={styles.footerLink}>Careers</a>
            <a href="#" className={styles.footerLink}>FAQs</a>
            <a href="#" className={styles.footerLink}>Terms of Service</a>
            <a href="#" className={styles.footerLink}>Privacy Policy</a>
          </div>

          <div className="footer-col">
            <div className={styles.footerHeading}>Categories</div>
            <a href="#" className={styles.footerLink}>Concerts &amp; Gigs</a>
            <a href="#" className={styles.footerLink}>Festivals &amp; Lifestyle</a>
            <a href="#" className={styles.footerLink}>Business &amp; Networking</a>
            <a href="#" className={styles.footerLink}>Food &amp; Drinks</a>
            <a href="#" className={styles.footerLink}>Performing Arts</a>
            <a href="#" className={styles.footerLink}>Sports &amp; Outdoors</a>
            <a href="#" className={styles.footerLink}>Exhibitions</a>
            <a href="#" className={styles.footerLink}>Workshops, Conferences &amp; Classes</a>
          </div>

          <div className="footer-col">
            <div className={styles.footerHeading}>Follow Us</div>
            <a href="#" className={styles.footerLink}>Facebook</a>
            <a href="#" className={styles.footerLink}>Instagram</a>
            <a href="#" className={styles.footerLink}>Twitter</a>
            <a href="#" className={styles.footerLink}>Youtube</a>
          </div>

          <div className="footer-col">
            <div className={styles.footerHeading}>Download The App</div>
            <a href="#" className={styles.appRow}>
              <span className={styles.appIcon} aria-hidden="true" />
              <span className={styles.appText}>
                <span className={styles.appTextSmall}>Get it on</span>
                <span className={styles.appTextBig}>Google Play</span>
              </span>
            </a>
            <a href="#" className={styles.appRow}>
              <span className={styles.appIcon} aria-hidden="true" />
              <span className={styles.appText}>
                <span className={styles.appTextSmall}>Download on the</span>
                <span className={styles.appTextBig}>App Store</span>
              </span>
            </a>
          </div>
        </div>
        <hr className={styles.footerDivider} />
        <div className={styles.copyright}>
          <span className={styles.copyrightIcon} aria-hidden="true" />
          <span>2023 Eventify. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
