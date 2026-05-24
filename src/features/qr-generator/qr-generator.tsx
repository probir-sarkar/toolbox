import { QRGeneratorInput } from "./components/generator";
import { QRGeneratorSettings } from "./components/settings";
import { QRGeneratorActionCard } from "./components/action-card";
import { QRGeneratorFaq } from "./components/faq";

export function QRGenerator() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Input */}
      <div className="lg:col-span-2">
        <QRGeneratorInput />
      </div>

      {/* Right Column - Settings & Actions */}
      <div className="space-y-6">
        <QRGeneratorSettings />
        <QRGeneratorActionCard />
      </div>
    </div>
  );
}

export { QRGeneratorFaq };
