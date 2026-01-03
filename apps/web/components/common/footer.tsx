import { Layers, Github, Twitter, Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-slate-900">
                            <Layers className="w-6 h-6 text-rose-600" />
                            <span>Toolbox.</span>
                        </Link>
                        <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                            Premium, open-source utilities for your daily workflow.
                            Built with privacy in mind – all processing happens locally in your browser.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <Link href="#" className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors">
                                <Github className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 mb-6">Tools</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li>
                                <Link href="/pdf-to-image" className="hover:text-rose-600 transition-colors">PDF to Image</Link>
                            </li>
                            <li>
                                <Link href="/image-converter" className="hover:text-rose-600 transition-colors">Image Converter</Link>
                            </li>
                            <li>
                                <Link href="/pdf-tools" className="hover:text-rose-600 transition-colors">Merge PDF</Link>
                            </li>
                            <li>
                                <Link href="/image-tools" className="hover:text-rose-600 transition-colors">Resize Image</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 mb-6">Project</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li>
                                <Link href="#" className="hover:text-rose-600 transition-colors">About</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-rose-600 transition-colors">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-rose-600 transition-colors">Terms of Service</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-rose-600 transition-colors">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} Toolbox. MIT Licensed.
                    </p>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                        Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> by developers, for developers.
                    </p>
                </div>
            </div>
        </footer>
    );
}
