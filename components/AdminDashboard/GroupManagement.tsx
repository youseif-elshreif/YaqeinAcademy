import React, { useState } from "react";
import { FiUsers, FiPlus, FiEdit, FiTrash2, FiUser } from "react-icons/fi";
import styles from "@/styles/AdminDashboard.module.css";

interface Group {
  id: string;
  name: string;
  description: string;
  teacherName: string;
  studentCount: number;
  maxStudents: number;
  schedule: string;
  isActive: boolean;
}

const GroupManagement: React.FC = () => {
  const [groups] = useState<Group[]>([
    {
      id: "1",
      name: "مجموعة حفظ القرآن المتقدمة",
      description: "مجموعة للطلاب المتقدمين في حفظ القرآن الكريم",
      teacherName: "فاطمة حسن",
      studentCount: 8,
      maxStudents: 10,
      schedule: "الأحد والثلاثاء 8:00 مساءً",
      isActive: true,
    },
    {
      id: "2",
      name: "مجموعة التجويد للمبتدئين",
      description: "تعلم أساسيات التجويد وتصحيح التلاوة",
      teacherName: "محمد أحمد",
      studentCount: 12,
      maxStudents: 15,
      schedule: "الاثنين والأربعاء 7:00 مساءً",
      isActive: true,
    },
    {
      id: "3",
      name: "مجموعة الحفظ للأطفال",
      description: "مجموعة خاصة بالأطفال لحفظ القرآن بطريقة ممتعة",
      teacherName: "عائشة علي",
      studentCount: 6,
      maxStudents: 8,
      schedule: "السبت والأحد 5:00 مساءً",
      isActive: false,
    },
  ]);

  const getStats = () => {
    const total = groups.length;
    const active = groups.filter((g) => g.isActive).length;
    const totalStudents = groups.reduce((sum, g) => sum + g.studentCount, 0);
    const avgStudentsPerGroup = Math.round(totalStudents / total);

    return { total, active, totalStudents, avgStudentsPerGroup };
  };

  const stats = getStats();

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>إدارة المجموعات</h1>
        <button
          className={`${styles.btn} ${styles.btnPrimary} ${styles.btnWithIcon}`}
        >
          <FiPlus />
          إنشاء مجموعة جديدة
        </button>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.teachers}`}>
              <FiUsers />
            </div>
          </div>
          <h3 className={styles.statValue}>{stats.total}</h3>
          <p className={styles.statLabel}>إجمالي المجموعات</p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.students}`}>
              <FiUsers />
            </div>
          </div>
          <h3 className={styles.statValue}>{stats.active}</h3>
          <p className={styles.statLabel}>مجموعات نشطة</p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.lessons}`}>
              <FiUser />
            </div>
          </div>
          <h3 className={styles.statValue}>{stats.totalStudents}</h3>
          <p className={styles.statLabel}>إجمالي الطلاب</p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.income}`}>
              <FiUsers />
            </div>
          </div>
          <h3 className={styles.statValue}>{stats.avgStudentsPerGroup}</h3>
          <p className={styles.statLabel}>متوسط الطلاب/مجموعة</p>
        </div>
      </div>

      {/* Groups Grid */}
      <div className={styles.cardsGrid}>
        {groups.map((group) => (
          <div key={group.id} className={styles.groupCard}>
            <div className={styles.groupHeader}>
              <div className={styles.groupInfo}>
                <h3 className={styles.groupName}>{group.name}</h3>
                <p className={styles.groupDescription}>{group.description}</p>
                <p className={styles.groupTeacher}>
                  المدرس: {group.teacherName}
                </p>
              </div>
              <span
                className={`${styles.statusBadge} ${
                  group.isActive ? styles.statusActive : styles.statusInactive
                }`}
              >
                {group.isActive ? "نشط" : "غير نشط"}
              </span>
            </div>

            <div className={styles.groupStats}>
              <div className={styles.groupStatItem}>
                <span className={styles.groupStatLabel}>عدد الطلاب:</span>
                <span className={styles.groupStatValue}>
                  {group.studentCount} / {group.maxStudents}
                </span>
              </div>
              <div className={styles.groupStatItem}>
                <span className={styles.groupStatLabel}>المواعيد:</span>
                <span className={styles.groupStatValue}>{group.schedule}</span>
              </div>
            </div>

            <div className={styles.groupActions}>
              <button className={`${styles.actionBtn} ${styles.manageBtn}`}>
                <FiUsers />
                إدارة الطلاب
              </button>
              <button className={`${styles.actionBtn} ${styles.editBtn}`}>
                <FiEdit />
                تعديل
              </button>
              <button className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                <FiTrash2 />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupManagement;
