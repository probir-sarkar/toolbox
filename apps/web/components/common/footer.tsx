import { Layers, Github, Twitter, Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-border bg-background pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-foreground">
                            <Layers className="w-6 h-6 text-primary" />
                            <span>Toolbox.</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                            Premium, open-source utilities for your daily workflow.
                            Built with privacy in mind – all processing happens locally in your browser.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <Link href="#" className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors">
                                <Github className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Tools</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link href="/pdf-to-image" className="hover:text-primary transition-colors">PDF to Image</Link>
                            </li>
                            <li>
                                <Link href="/image-converter" className="hover:text-primary transition-colors">Image Converter</Link>
                            </li>
                            <li>
                                <Link href="/pdf-tools" className="hover:text-primary transition-colors">Merge PDF</Link>
                            </li>
                            <li>
                                <Link href="/image-tools" className="hover:text-primary transition-colors">Resize Image</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Project</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">About</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Toolbox. MIT Licensed.
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        Made with <Heart className="w-4 h-4 text-primary fill-primary" /> by developers, for developers.
                    </p>
                </div>
            </div>
        </footer>
    );
}
