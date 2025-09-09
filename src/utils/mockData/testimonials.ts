import { Testimonial } from '../../types/testimonial.types';

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'أم عائشة وأحمد',
    content: 'أكاديمية يقين غيرت حياتي! التعلم هنا ممتع وفعال، والمعلمين متخصصين ومتفهمين لاحتياجات الطلاب.',
    status: 'approved',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '2',
    name: 'محمد الأحمد',
    content: 'منهج رائع ومنظم، استطعت حفظ جزء كامل في شهرين فقط بفضل الطريقة المميزة في التعليم.',
    status: 'approved',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-11')
  },
  {
    id: '3',
    name: 'فاطمة السيد',
    content: 'المعلمات محترفات جداً ويساعدن في تحسين النطق والتجويد بطريقة مبسطة وواضحة.',
    status: 'approved',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-21')
  },
  {
    id: '4',
    name: 'أبو يوسف',
    content: 'المرونة في المواعيد ممتازة، يمكنني الدراسة في الوقت المناسب لي دون ضغوط.',
    status: 'approved',
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-06')
  },
  {
    id: '5',
    name: 'سارة علي',
    content: 'أولادي يحبون الحصص كثيراً، والمعلمين يجعلون التعلم ممتعاً ومشوقاً لهم.',
    status: 'approved',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-16')
  },
  {
    id: '6',
    name: 'أحمد محمود',
    content: 'البيئة التعليمية محفزة جداً، والمتابعة المستمرة تساعد في التقدم بشكل ملحوظ.',
    status: 'pending',
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-03-20')
  }
];
