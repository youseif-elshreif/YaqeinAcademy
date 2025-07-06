import { useState } from "react";

interface FilterFunc {
  onfilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  teacherName: string;
  time: string;
  type: string;
  sort: string;
}

const Fil = ({ onfilterChange }: FilterFunc) => {
  let [filters, setFilters] = useState<FilterState>({
    teacherName: "",
    time: "",
    type: "",
    sort: "newest",
  });

  function handleFilterChange(key: keyof FilterState, value: string) {
    let newFilters = { ...filters, [key]: value };
    onfilterChange?.(newFilters);
    setFilters(newFilters);
  }

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        width: "100%",
      }}
    >
      <div
        className="FilterContainer"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <div className="filterHeader">
          <label htmlFor="teacherName">المدرس</label>
          <select
            id="teacherName"
            style={{ padding: "0.5rem", fontSize: "1rem" }}
            onChange={(e) => handleFilterChange("teacherName", e.target.value)}
          >
            <option value="">جميع المدرسين</option>
            <option value="أحمد محمد">د. أحمد محمد</option>
            <option value="فاطمة علي">د. فاطمة علي</option>
            <option value="محمد حسن">الشيخ محمد حسن</option>
            <option value="عائشة أحمد">د. عائشة أحمد</option>
            <option value="خالد السيد">د. خالد السيد</option>
            <option value="سارة يوسف">الأستاذة سارة يوسف</option>
            <option value="يوسف حامد">د. يوسف حامد</option>
            <option value="محمد الطيب">د. محمد الطيب</option>
            <option value="نورا إبراهيم">د. نورا إبراهيم</option>
          </select>
        </div>
        <div className="filterHeader">
          <label htmlFor="time">المدة</label>
          <select
            id="time"
            style={{ padding: "0.5rem", fontSize: "1rem" }}
            onChange={(e) => handleFilterChange("time", e.target.value)}
          >
            <option value="">جميع المدد</option>
            <option value="أسبوع">أسبوع واحد</option>
            <option value="شهر واحد">شهر واحد</option>
            <option value="شهرين">شهرين</option>
            <option value="3 أشهر">3 أشهر</option>
            <option value="6 أشهر">6 أشهر</option>
          </select>
        </div>
        <div className="filterHeader">
          <label htmlFor="type">النوع</label>
          <select
            id="type"
            style={{ padding: "0.5rem", fontSize: "1rem" }}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          >
            <option value="">جميع الأنواع</option>
            <option value="تفسير">تفسير القرآن</option>
            <option value="حديث">علوم الحديث</option>
            <option value="فقه">الفقه</option>
            <option value="عقيدة">العقيدة</option>
            <option value="سيرة">السيرة النبوية</option>
            <option value="تجويد">تجويد القرآن</option>
          </select>
        </div>
        <div className="filterHeader">
          <label htmlFor="sort">الترتيب</label>
          <select
            id="sort"
            style={{ padding: "0.5rem", fontSize: "1rem" }}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
          >
            <option value="newest">الأحدث</option>
            <option value="oldest">الأقدم</option>
            <option value="name">الاسم</option>
            <option value="instructor">المدرس</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Fil;
