import { FileBarChartIcon } from 'lucide-react';

export default function Page() {
  return (
    <section className="grid gap-8 w-full">
      <div className="flex gap-4 place-items-center">
        <FileBarChartIcon className="bg-primary rounded-lg p-2 text-white" size={38} />
        <span className="text-md font-semibold">All reports</span>
      </div>
    </section>
  );
}
