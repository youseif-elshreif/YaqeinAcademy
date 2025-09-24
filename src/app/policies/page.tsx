import PoliciesPage from '@/src/components/pages/PoliciesPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سياسات الأكاديمية | أكاديمية يقين',
  description: 'تعرف على سياسات وقوانين أكاديمية يقين للتعليم القرآني والأسئلة الشائعة',
  keywords: 'سياسات, قوانين, أكاديمية يقين, تعليم القرآن, الأسئلة الشائعة',
};

export default function Policies() {
  return <PoliciesPage />;
}