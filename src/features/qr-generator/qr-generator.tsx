import { QRGeneratorInput } from "./generator";
import { QRGeneratorSettings } from "./settings";
import { QRGeneratorActionCard } from "./action-card";
import { QRGeneratorFaq } from "./faq";

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