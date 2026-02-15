import Image from 'next/image';
import Card from '@/src/components/ui/Card';

const DashboardPreview = () => {
  return (
    <Card variant="glass" className="relative overflow-hidden">
      <div className="aspect-[16/9] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20" />

        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />

        <div className="absolute top-4 left-4 w-48 h-8 bg-white/10 rounded-lg backdrop-blur-sm" />
        <div className="absolute top-4 right-4 w-32 h-8 bg-white/10 rounded-lg backdrop-blur-sm" />

        <div className="absolute bottom-4 left-4 right-4">
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-white/10 rounded-lg backdrop-blur-sm" />
            ))}
          </div>
        </div>

        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-48 h-32 bg-white/10 rounded-lg backdrop-blur-sm" />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-64 h-40 bg-white/10 rounded-lg backdrop-blur-sm" />
      </div>
    </Card>
  );
};

export default DashboardPreview;