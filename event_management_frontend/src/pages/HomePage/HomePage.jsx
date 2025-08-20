/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import '../../styles/common.css';

/**
 * HomePage from Figma extraction with interactions:
 * - Search clear button
 * - Location dropdown toggle
 * - Single-select chips for "Popular" filter
 * - Newsletter subscribe console log
 */
// PUBLIC_INTERFACE
export default function HomePage() {
  const [locationOpen, setLocationOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeChip, setActiveChip] = useState('All');
  const locationRef = useRef(null);

  const chips = useMemo(() => ['All', 'Today', 'Tomorrow', 'This Weekend', 'Free'], []);

  const toggleLocation = () => setLocationOpen((v) => !v);
  const closeLocation = (e) => {
    if (locationRef.current && !locationRef.current.contains(e.target)) {
      setLocationOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', closeLocation);
    return () => document.removeEventListener('click', closeLocation);
  }, []);

  const onSubscribe = (e) => {
    e.preventDefault();
    // mimic original toast
    // eslint-disable-next-line no-console
    console.log(search ? `Subscribed: ${search}` : 'Subscribe clicked');
  };

  const navigate = useNavigate();

  return (
    <main className={styles.homePage} role="main" aria-label="Home Page">

      <section className={styles.hero} aria-label="Hero">
        <h1 className={styles.heroTitle}>
          Don’t miss out!
          <br />
          Explore the vibrant events happening locally and globally.
        </h1>

        <div className={styles.searchBar} role="search">
          <div className={styles.searchInput}>
            <span className={styles.iconSearch} aria-hidden="true" />
            <input
              className={styles.searchInputInput}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Events, Categories, Location,..."
              aria-label="Search events, categories, location"
            />
            <button
              className={styles.iconClose}
              aria-label="Clear search"
              onClick={() => setSearch('')}
            />
          </div>

          <div
            className={`${styles.locationDropdown} ${locationOpen ? styles.locationDropdownExpanded : ''}`}
            aria-haspopup="listbox"
            aria-expanded={locationOpen ? 'true' : 'false'}
            id="locationDropdown"
            ref={locationRef}
            onClick={toggleLocation}
          >
            <span className={styles.iconLocation} aria-hidden="true" />
            <span className={styles.locationValue}>Mumbai</span>
            <span className={styles.iconChevron} aria-hidden="true" />
            <div className={styles.locationOptions} role="listbox" aria-label="Locations">
              <button className={styles.locationItem} role="option">
                <span className={styles.iconRound} aria-hidden="true" />
                <span className="item-text">Detect Current Location</span>
              </button>
              <button className={styles.locationItem} role="option">
                <span className={styles.iconRound} aria-hidden="true" />
                <span className="item-text">Online</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionCategories}`} aria-labelledby="heading-categories">
        <h2 id="heading-categories" className={styles.sectionTitle}>
          Explore Categories
        </h2>

        <div className={styles.categoriesGrid}>
          {[
            'Entertainment',
            'Educational & Business',
            'Cultural & Arts',
            'Sports & Fitness',
            'Technology & Innovation',
            'Travel & Adventure',
          ].map((label, idx) => (
            <div key={label} className={`${styles.category} ${idx === 1 || idx === 4 ? styles.categoryTall : ''}`}>
              <div className={styles.categoryAvatar} />
              <div className={styles.categoryLabel}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionPopular}`} aria-labelledby="heading-popular">
        <h2 id="heading-popular" className={styles.sectionTitle}>Popular Events in Mumbai</h2>

        <div className={styles.chipsRow} role="tablist" aria-label="Event filters by day">
          {chips.map((c) => (
            <button
              key={c}
              className={`${styles.chip} ${activeChip === c ? styles.chipActive : ''}`}
              role="tab"
              aria-selected={activeChip === c ? 'true' : 'false'}
              onClick={() => {
                setActiveChip(c);
                // eslint-disable-next-line no-console
                console.log('Filter: ' + c);
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className={styles.cardsGrid}>
          {[
            { month: 'NOV', title: 'Lakeside Camping at Pawna', price: 'INR 1,400', meta: '14 interested', double: true, range: ['25', '26'] },
            { month: 'DEC', title: 'Sound Of Christmas  2023', price: 'INR 499', meta: '16 interested', single: '02' },
            { month: 'DEC', title: 'Meet the Royal College of Art in Mumbai 2023', price: 'FREE', single: '02' },
            { month: 'DEC', title: 'Global Engineering Education Expo 2023', price: 'FREE', meta: '48 interested', single: '03' },
            { month: 'DEC', title: 'Cricket Business Meetup', price: 'INR 399', single: '08' },
            { month: 'FEB', title: "Valentine's Day Sail on a Yacht in Mumbai", price: 'INR 2,999', meta: '160 interested', single: '14' },
          ].map((c, i) => (
            <article key={i} className={styles.card}>
              <div className={styles.cardImage}>
                {/* badges */}
                <span className={styles.badgeCategory}>Category</span>
                <button className={styles.btnInterest} aria-label="Mark as interested"><span className={styles.star} /></button>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.dateBlock}>
                  <div className={styles.month}>{c.month}</div>
                  {c.double ? (
                    <div className={styles.dateRange}><span>{c.range[0]}</span><span className={styles.dash}>-</span><span>{c.range[1]}</span></div>
                  ) : (
                    <div className={styles.dateSingle}>{c.single}</div>
                  )}
                </div>
                <div className={styles.details}>
                  <h3 className={styles.title}>{c.title}</h3>
                  <div className={styles.venue}>Venue</div>
                  <div className={styles.time}>Time</div>
                  <div className={styles.meta}>
                    <div className={styles.price}><span className={styles.iconTicket} /><span>{c.price}</span></div>
                    <span className={styles.dot} />
                    {c.meta && <div className="interested"><span className="star small" /><span>{c.meta}</span></div>}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.seeMoreWrap}>
          <button className={styles.seeMore}>See More</button>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionOnline}`} aria-labelledby="heading-online">
        <h2 id="heading-online" className={styles.sectionTitle}>Discover Best of Online Events</h2>

        <div className={`${styles.cardsGrid} ${styles.sectionOnlineCards}`}>
          {[...Array(6)].map((_, i) => (
            <article key={i} className={styles.card}>
              <div className={styles.cardImage}>
                <span className={styles.badgeCategory}>Category</span>
                <button className={styles.btnInterest} aria-label="Mark as interested"><span className={styles.star} /></button>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.dateBlock}>
                  <div className={styles.month}>DEC</div>
                  <div className={styles.dateSingle}>12</div>
                </div>
                <div className={styles.details}>
                  <h3 className={styles.title}>Online sample event</h3>
                  <div className={styles.venue}>Online</div>
                  <div className={styles.time}>Time</div>
                  <div className={styles.meta}>
                    <div className={styles.price}><span className={styles.iconTicket} /><span>FREE</span></div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={`${styles.seeMoreWrap} ${styles.sectionOnlineSeeMore}`}>
          <button className={styles.seeMore}>See More</button>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionPersonalized}`} aria-labelledby="heading-personalized">
        <h2 id="heading-personalized" className={`${styles.sectionTitle} ${styles.sectionPersonalizedTitle}`}>Events specially curated for you!</h2>
        <p className={styles.sectionPersonalizedSub}>
          Get event suggestions tailored to your interests! Don't let your favorite events slip away.
        </p>
        <Link to="/select-interests" className={styles.getStarted} role="button" aria-label="Get Started: Select your interests">
          <span className={styles.getStartedText}>Get Started</span>
          <span className={styles.iconAddLg} aria-hidden="true" />
        </Link>
      </section>

      <section className={`${styles.section} ${styles.sectionWorld}`} aria-labelledby="heading-world">
        <h2 id="heading-world" className={styles.sectionTitle}>Trending Events around the World</h2>

        <div className={`${styles.cardsGrid} ${styles.sectionWorldCards}`}>
          {[...Array(6)].map((_, i) => (
            <article key={i} className={styles.card}>
              <div className={styles.cardImage}>
                <span className={styles.badgeCountry}>Country</span>
                <span className={styles.badgeCategory}>Entertainment</span>
                <button className={styles.btnInterest} aria-label="Mark as interested"><span className={styles.star} /></button>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.dateBlock}>
                  <div className={styles.month}>NOV</div>
                  <div className={styles.dateSingle}>25</div>
                </div>
                <div className={styles.details}>
                  <h3 className={styles.title}>World event sample</h3>
                  <div className={styles.venue}>City</div>
                  <div className={styles.time}>Time</div>
                  <div className={styles.meta}>
                    <div className={styles.price}><span className={styles.iconTicket} /><span>USD 10</span></div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.seeMoreWrap}>
          <button className={styles.seeMore}>See More</button>
        </div>
      </section>

      <section className={styles.sectionCreateCta} aria-labelledby="heading-create-cta">
        <h2 id="heading-create-cta" className={styles.ctaTitle}>Create an event with Eventify</h2>
        <p className={styles.ctaSubtitle}>Got a show, event, activity or a great experience? Partner with us &amp; get listed on Eventify</p>
        <Link to="/create-event" className={styles.createEventLarge} role="button" aria-label="Create Event">
          <span className={styles.iconAddLg} aria-hidden="true" />
          <span className="label">Create Event</span>
        </Link>
      </section>

      <section className={styles.sectionNewsletter} aria-labelledby="heading-newsletter">
        <h2 id="heading-newsletter" className={styles.newsletterTitle}>Subscribe to our Newsletter</h2>
        <p className={styles.newsletterSubtitle}>Receive our weekly newsletter &amp; updates with new events from your favourite organizers &amp; venues.</p>
        <form className={styles.newsletterForm} onSubmit={onSubscribe}>
          <input
            type="email"
            className={styles.newsletterInput}
            placeholder="Enter your e-mail address"
            aria-label="Enter your e-mail address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={styles.newsletterBtn} type="submit">Subscribe</button>
        </form>
      </section>
    </main>
  );
}
