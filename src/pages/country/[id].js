import Layout from "../../components/Layout/Layout";
import Image from "next/image";
import styles from "./country.module.css";
import { useState } from "react";
import { useEffect } from "react";

const getCountry = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/alpha/${id}`);
  const country = await res.json();
  return country;
};

const Country = ({ country }) => {
  console.log(country);
  const [borders, setBorders] = useState();
  const getBorders = async () => {
    const border = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );
    setBorders(border);
  };

  useEffect(() => {
    getBorders();
  }, []);
  console.log(borders);
  return (
    <Layout title={country.name}>
      <div>
        <div className={styles.overviewPanel}>
          <img src={country.flag} alt={country.name} />
          <h1 className={styles.overview_name}>{country.name}</h1>
          <div className={styles.overview_region}>{country.region}</div>
          <div className={styles.overview_numbers}>
            <div className={styles.overview_population}>
              <div className={styles.overview_value}>{country.population}</div>
              <div className={styles.overview_label}>Population</div>
            </div>
            <div className={styles.overview_area}>
              <div className={styles.overview_value}>{country.area}</div>
              <div className={styles.overview_label}>Area</div>
            </div>
          </div>
        </div>
        <div className={styles.details_panel}>
          <h4 className={styles.details_panel_heading}>Details</h4>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Capital</div>
            <div className={styles.details_panel_value}>{country.capital}</div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Subregion</div>
            <div className={styles.details_panel_value}>
              {country.subregion}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Languages</div>
            <div className={styles.details_panel_value}>
              {country.languages.map(({ name }) => name).join(", ")}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Currencies</div>
            <div className={styles.details_panel_value}>
              {country.currencies.map(({ name }) => name).join(", ")}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>Gini</div>
            <div className={styles.details_panel_value}>{country.gini} %</div>
          </div>

          <div className={styles.details_panel_borders}>
            <div className={styles.details_panel_borders_label}>
              Neighbouring Countries
            </div>

            <div className={styles.details_panel_borders_container}>
              {borders?.map(({ flag, name }, i) => (
                <div className={styles.details_panel_borders_country} key={i}>
                  <img src={flag} alt={name}></img>

                  <div className={styles.details_panel_borders_name}>
                    {name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: { country },
  };
};
