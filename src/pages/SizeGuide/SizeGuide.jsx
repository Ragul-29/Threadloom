import { ArrowRight, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import "./SizeGuide.css";

const womenSizes = [
  {
    size: "XS",
    bust: "32",
    waist: "26",
    hip: "34",
  },
  {
    size: "S",
    bust: "34",
    waist: "28",
    hip: "36",
  },
  {
    size: "M",
    bust: "36",
    waist: "30",
    hip: "38",
  },
  {
    size: "L",
    bust: "38",
    waist: "32",
    hip: "40",
  },
  {
    size: "XL",
    bust: "40",
    waist: "34",
    hip: "42",
  },
];

const menSizes = [
  {
    size: "S",
    chest: "36",
    waist: "30",
    hip: "36",
  },
  {
    size: "M",
    chest: "38",
    waist: "32",
    hip: "38",
  },
  {
    size: "L",
    chest: "40",
    waist: "34",
    hip: "40",
  },
  {
    size: "XL",
    chest: "42",
    waist: "36",
    hip: "42",
  },
  {
    size: "XXL",
    chest: "44",
    waist: "38",
    hip: "44",
  },
];

function SizeGuide() {
  return (
    <main className="size-guide-page">
      {/* HEADER */}
      <section className="size-guide-header">
        <div className="container">
          <p className="size-guide-eyebrow">
            THREADLOOM / SIZE GUIDE
          </p>

          <h1>
            Find your
            <br />
            <em>perfect fit.</em>
          </h1>

          <p className="size-guide-intro">
            Use our measurement guide to find the size that
            feels right for you. Measurements are provided in
            inches.
          </p>
        </div>
      </section>

      {/* HOW TO MEASURE */}
      <section className="size-guide-measure">
        <div className="container">
          <div className="size-guide-section-heading">
            <div>
              <p className="size-guide-label">
                01 — MEASURE YOURSELF
              </p>

              <h2>
                Three simple
                <br />
                <em>measurements.</em>
              </h2>
            </div>

            <Ruler size={42} strokeWidth={1} />
          </div>

          <div className="measurement-grid">
            <article className="measurement-card">
              <span>01</span>

              <div className="measurement-line">
                <div className="measurement-circle">
                  B
                </div>
              </div>

              <h3>Bust / Chest</h3>

              <p>
                Measure around the fullest part of your
                bust or chest, keeping the measuring tape
                comfortably level.
              </p>
            </article>

            <article className="measurement-card">
              <span>02</span>

              <div className="measurement-line">
                <div className="measurement-circle">
                  W
                </div>
              </div>

              <h3>Waist</h3>

              <p>
                Measure around the narrowest part of your
                natural waist without pulling the tape too
                tightly.
              </p>
            </article>

            <article className="measurement-card">
              <span>03</span>

              <div className="measurement-line">
                <div className="measurement-circle">
                  H
                </div>
              </div>

              <h3>Hips</h3>

              <p>
                Measure around the fullest part of your hips
                while keeping the tape parallel to the floor.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* WOMEN TABLE */}
      <section className="size-table-section">
        <div className="container">
          <div className="size-table-heading">
            <div>
              <p className="size-guide-label">
                02 — WOMEN
              </p>

              <h2>
                Women's
                <br />
                <em>size chart.</em>
              </h2>
            </div>

            <p>
              Body measurements are shown in inches.
            </p>
          </div>

          <div className="size-table-wrap">
            <table className="size-table">
              <thead>
                <tr>
                  <th>SIZE</th>
                  <th>BUST</th>
                  <th>WAIST</th>
                  <th>HIPS</th>
                </tr>
              </thead>

              <tbody>
                {womenSizes.map((item) => (
                  <tr key={item.size}>
                    <td>{item.size}</td>
                    <td>{item.bust}"</td>
                    <td>{item.waist}"</td>
                    <td>{item.hip}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* MEN TABLE */}
      <section className="size-table-section men-size-section">
        <div className="container">
          <div className="size-table-heading">
            <div>
              <p className="size-guide-label">
                03 — MEN
              </p>

              <h2>
                Men's
                <br />
                <em>size chart.</em>
              </h2>
            </div>

            <p>
              Body measurements are shown in inches.
            </p>
          </div>

          <div className="size-table-wrap">
            <table className="size-table">
              <thead>
                <tr>
                  <th>SIZE</th>
                  <th>CHEST</th>
                  <th>WAIST</th>
                  <th>HIPS</th>
                </tr>
              </thead>

              <tbody>
                {menSizes.map((item) => (
                  <tr key={item.size}>
                    <td>{item.size}</td>
                    <td>{item.chest}"</td>
                    <td>{item.waist}"</td>
                    <td>{item.hip}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FIT NOTE */}
      <section className="size-guide-note">
        <div className="container">
          <div className="size-guide-note-inner">
            <p className="size-guide-label">
              04 — NEED HELP?
            </p>

            <h2>
              Between
              <br />
              <em>two sizes?</em>
            </h2>

            <p>
              If your measurements fall between two sizes,
              we recommend choosing the larger size for a
              more relaxed fit. For a closer fit, choose the
              smaller size.
            </p>

            <Link
              to="/shop"
              className="size-guide-button"
            >
              SHOP COLLECTION
              <ArrowRight
                size={15}
                strokeWidth={1.4}
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SizeGuide;