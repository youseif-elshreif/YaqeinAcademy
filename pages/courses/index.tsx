import Head from "next/head";
import HeroSection from "../../components/HeroSection/HeroSection";
import CoursesGrid from "../../components/CoursesGrid/CoursesGrid";
import { coursesData } from "../../data/courses";

interface FilterState {
  instructor: string;
  duration: string;
  type: string;
  sortBy: string;
}

const CoursesPage = () => {
  return (
    <>
      <Head>
        <title>تصفح دوراتنا - أكاديمية يقين</title>
        <meta
          name="description"
          content="استكشف مجموعة متنوعة من الدورات المتخصصة في العلوم الشرعية في أكاديمية يقين. دورات في التفسير، الحديث، الفقه، العقيدة والسيرة النبوية."
        />
        <meta
          name="keywords"
          content="دورات شرعية, تفسير القرآن, علوم الحديث, الفقه الإسلامي, العقيدة, السيرة النبوية, تعليم إسلامي"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HeroSection />
        {coursesData.length > 0 ? (
          <>
            <CoursesGrid
              courses={coursesData}
              showBtn={true}
              isContainer={true}
            />  
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 0",
              color: "var(--text-light)",
            }}
          >
            <h3>لا يوجد دورات في الوقت الحالي</h3>
            <p>ستتاح الدورات قريباً إن شاء الله</p>
          </div>
        )}
      </main>
    </>
  );
};

export default CoursesPage;
