import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "@/src/styles/Home.module.css";
import {
  FaMosque,
  FaScroll,
  FaSearch,
  FaClipboardList,
  FaCheck,
  FaUserGraduate,
  FaUsers,
  FaGlobe,
  FaClock,
} from "react-icons/fa";
import Button from "@/src/components/common/Button";
import TestimonialsSwiperContainer from "@/src/components/common/TestimonialsSwiperContainer";

export default function Home() {
  return (
    <>
      <Head>
        <title>أكاديمية يقين - التعليم الشرعي المتميز</title>
        <meta
          name="description"
          content="أكاديمية يقين للعلوم الشرعية - مؤسسة تعليمية متخصصة في تدريس العلوم الشرعية"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <h1>مرحبًا بكم في أكاديمية يقين</h1>
            <div className={styles.heroLogo}>
              <Image
                src="/img/logo/logo.webp"
                alt="شعار أكاديمية يقين"
                className={styles.logoImage}
                width={200}
                height={200}
              />
            </div>
            <p>انطلق في رحلة إيمانية مع أكاديمية يقين !</p>
            <Link href="/register">
              <Button variant="primary">انضم الآن</Button>
            </Link>
          </div>
        </section>

        <section className={styles.features}>
          <div className="container">
            <h2 className={styles.header}>لماذا تختار أكاديمية يقين؟</h2>
            <Image
              src="/img/logo/logo-light.svg"
              alt="شعار أكاديمية يقين"
              className={styles.logoLight}
              width={100}
              height={100}
            />
            <ul>
              <li>
                <Image
                  className={styles.svgIcon}
                  src="/img/features/1.svg"
                  alt=""
                  width={80}
                  height={80}
                />
                <h3>جدولة مرنة تناسب حياتك</h3>
                اختر مواعيدك بحرية وعدّلها متى شئت لتتناسب مع جدولك اليومي
              </li>
              <li>
                <Image
                  className={styles.svgIcon}
                  src="/img/features/2.svg"
                  alt=""
                  width={80}
                  height={80}
                />
                <h3>حلقات مستحقة مع نخبة المعلمين</h3>
                استمتع بجلسات فردية مخصصة مع معلمين ذوي خبرة، مصممة لتلبية
                احتياجاتك التعليمية الفريدة.
              </li>
              <li>
                <Image
                  className={styles.svgIcon}
                  src="/img/features/3.svg"
                  alt=""
                  width={80}
                  height={80}
                />
                <h3>تعليم القرآن بلغتك الأم</h3>
                نفخر بتقديم دروس بمختلف اللغات، مما يجعل تعلم القرآن الكريم
                متاحًا للجميع، بغض النظر عن لغتهم الأصلية.
              </li>
              <li>
                <Image
                  className={styles.svgIcon}
                  src="/img/features/4.svg"
                  alt=""
                  width={80}
                  height={80}
                />
                <h3>تأسيس متين في القراءة والكتابة</h3>
                برامج متخصصة لتعليم القراءة والكتابة باستخدام أحدث الطرق
                التعليمية المبتكرة والفعالة.
              </li>
              <li>
                <Image
                  className={styles.svgIcon}
                  src="/img/features/5.svg"
                  alt=""
                  width={80}
                  height={80}
                />
                <h3>حوافز تشجيعية وتكريم للتميز</h3>
                نكافئ التفوق! مسابقات شهرية وشهادات تقدير لتحفيز طلابنا على
                التميز والإبداع.
              </li>
              <li>
                <Image
                  className={styles.svgIcon}
                  src="/img/features/6.svg"
                  alt=""
                  width={80}
                  height={80}
                />
                <h3>متابعة دقيقة لتقدمك</h3>
                تقييمات دورية لضمان تقدمك المستمر، مع تقارير مفصلة لمساعدتك على
                تحقيق أهدافك التعليمية.
              </li>
              <li>
                <Image
                  className={styles.svgIcon}
                  src="/img/features/7.svg"
                  alt=""
                  width={80}
                  height={80}
                />
                <h3> بيئة تعليمية داعمة ومحفزة</h3>
                نسعى لخلق جو إيجابي يشجع على التعلم والنمو الروحي والمعرفي.
              </li>
              <li>
                <Image
                  className={styles.svgIcon}
                  src="/img/features/8.svg"
                  alt=""
                  width={80}
                  height={80}
                />
                <h3>منهج شامل متكامل</h3>
                نقدم منهجًا متكاملاً يجمع بين تحفيظ القرآن وفهم معانيه وتطبيق
                أحكامه في الحياة اليومية
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.about}>
          <div className="container">
            <div className={styles.aboutContainer}>
              {/* Header Section */}
              <div className={styles.aboutHeader}>
                <div className={styles.headerContent}>
                  <div className={styles.headerIcon}>
                    <div className={styles.iconContainer}>
                      <span className={styles.mainIcon1}>
                        <FaMosque />
                      </span>
                      <div className={styles.iconGlow}></div>
                    </div>
                  </div>
                  <h2 className={styles.header}>عن الأكاديمية</h2>
                  <p className={styles.aboutSubtitle}>
                    مؤسسة تعليمية رائدة في تدريس العلوم الشرعية وتحفيظ القرآن
                    الكريم
                  </p>
                </div>

                {/* Main Content Cards */}
                <div className={styles.aboutContent}>
                  <div className={styles.aboutCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIconWrapper}>
                        <div className={styles.mainIcon}>
                          <FaScroll />
                        </div>
                        <div className={styles.cardIconBg}></div>
                      </div>
                      <h3 className={styles.cardTitle}>الرسالة</h3>
                    </div>
                    <div className={styles.cardBody}>
                      <p className={styles.cardText}>
                        توفير فرصة لكل راغب في تعلم كتاب الله تعالى حفظاً
                        وتدبراً وفق اتباع منهج أهل السنة والجماعة في التعليم
                        لأصول الدين الإسلامي معتمداً على أصل الشريعة -القرآن
                        الكريم- وما يحتويه من أحكام وشرائع تقيم مجتمعاً إسلامياً
                        راقياً وذلك بطريقة مميزة في بيئة محفزة بتقنية حديثة
                        لجميع المسلمين حول العالم.
                      </p>
                    </div>
                  </div>

                  <div className={styles.aboutCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIconWrapper}>
                        <div className={styles.mainIcon}>
                          <FaSearch />
                        </div>
                        <div className={styles.cardIconBg}></div>
                      </div>
                      <h3 className={styles.cardTitle}>الرؤية</h3>
                    </div>
                    <div className={styles.cardBody}>
                      <p className={styles.cardText}>
                        إخراج جيل حافظ لكتاب الله تعالى عالم بشرعه على الطريقة
                        الصحيحة، مستعد لمجابهة تحديات العصر، وفق آلية معينة
                        ميسرة تحقق أفضل النتائج وذلك بأفضل الوسائل التربوية
                        وأحدث الطرق التعليمية.
                      </p>
                    </div>
                  </div>

                  <div className={styles.aboutCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIconWrapper}>
                        <div className={styles.mainIcon}>
                          <FaClipboardList />
                        </div>
                        <div className={styles.cardIconBg}></div>
                      </div>
                      <h3 className={styles.cardTitle}>الأهداف</h3>
                    </div>
                    <div className={styles.cardBody}>
                      <ul className={styles.goalsList}>
                        <li>
                          <span className={styles.goalIcon}>
                            <FaCheck />
                          </span>
                          التطلع لأن تكون الأكاديمية صرحا قرآنيًا نموذجيًا،
                          ورائداً في كل المجالات المتعلقة بتعليم القرآن الكريم.
                        </li>
                        <li>
                          <span className={styles.goalIcon}>
                            <FaCheck />
                          </span>
                          أن يكون البرنامج سببا في عودة كثير من المسلمين
                          للاعتصام بكلام ربهم؛ فينالون بذلك كل خير، ويدفع عنهم
                          كل سوء وشر.
                        </li>
                        <li>
                          <span className={styles.goalIcon}>
                            <FaCheck />
                          </span>
                          تعليم القرآن الكريم بمفهومه الواسع بأفضل الخطط
                          والبرامج، وصولا إلى العمل بالقرآن وامتثاله.
                        </li>
                        <li>
                          <span className={styles.goalIcon}>
                            <FaCheck />
                          </span>
                          غرس محبة القرآن في النفوس.
                        </li>
                        <li>
                          <span className={styles.goalIcon}>
                            <FaCheck />
                          </span>
                          تخريج شخصيات قرآنية متخلقين بأخلاق القرآن الكريم.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Statistics Section */}
                <div className={styles.statsSection}>
                  <div className={styles.statsHeader}>
                    <h3 className={styles.statsTitle}>إحصائياتنا المميزة</h3>
                    <p className={styles.statsSubtitle}>
                      أرقام تتحدث عن تميزنا وإنجازاتنا
                    </p>
                  </div>
                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <div className={styles.statIconWrapper}>
                        <div className={styles.mainIcon}>
                          <FaClock />
                        </div>
                        <div className={styles.statGlow}></div>
                      </div>
                      <div className={styles.statContent}>
                        <div className={styles.statNumber}>10,000+</div>
                        <div className={styles.statLabel}>ساعة عمل</div>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statIconWrapper}>
                        <div className={styles.mainIcon}>
                          <FaUserGraduate />
                        </div>
                        <div className={styles.statGlow}></div>
                      </div>
                      <div className={styles.statContent}>
                        <div className={styles.statNumber}>1,000+</div>
                        <div className={styles.statLabel}>طالب</div>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statIconWrapper}>
                        <div className={styles.mainIcon}>
                          <FaUsers />
                        </div>
                        <div className={styles.statGlow}></div>
                      </div>
                      <div className={styles.statContent}>
                        <div className={styles.statNumber}>20+</div>
                        <div className={styles.statLabel}>معلم - معلمة</div>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statIconWrapper}>
                        <div className={styles.mainIcon}>
                          <FaGlobe />
                        </div>
                        <div className={styles.statGlow}></div>
                      </div>
                      <div className={styles.statContent}>
                        <div className={styles.statNumber}>10+</div>
                        <div className={styles.statLabel}>دول</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSwiperContainer />

        <section className={styles.cta}>
          <div className={styles.ctaContainer}>
            <h2 className={styles.header2}>هل أنت مستعد للانضمام إلينا؟</h2>
            <Link href="/register">
              <Button variant="secondary">انضم الآن</Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
