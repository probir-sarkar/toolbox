"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Layers, Image as ImageIcon, FileText, Menu, X, Hammer, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const tools = [
    {
        title: "PDF Tools",
        href: "/pdf-tools",
        icon: Hammer,
        description: "Merge, split, compress, and edit PDF documents.",
        items: [
            { title: "PDF to Image", href: "/pdf-to-image", description: "Convert PDF pages to images." },
            { title: "Merge PDF", href: "/pdf-tools", description: "Combine multiple PDFs into one." },
        ]
    },
    {
        title: "Image Tools",
        href: "/image-tools",
        icon: Palette,
        description: "Convert, resize, and optimize your images.",
        items: [
            { title: "Image Converter", href: "/image-converter", description: "Batch convert image formats." },
            { title: "Resize Image", href: "/image-tools", description: "Change image dimensions." },
        ]
    },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-slate-900 mr-8">
                    <Layers className="w-6 h-6 text-rose-600" />
                    <span>Toolbox.</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-1">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Home
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {tools.map((tool) => (
                                            <li key={tool.title} className="row-span-3">
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-slate-50 to-muted p-6 no-underline outline-hidden focus:shadow-md"
                                                        href={tool.href}
                                                    >
                                                        <tool.icon className="h-6 w-6 text-rose-600 mb-4" />
                                                        <div className="mb-2 mt-4 text-lg font-medium text-slate-900">
                                                            {tool.title}
                                                        </div>
                                                        <p className="text-sm leading-tight text-slate-600">
                                                            {tool.description}
                                                        </p>
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Action Button */}
                <div className="hidden md:flex items-center gap-4">
                    <Button asChild variant="ghost" size="sm" className="text-slate-600">
                        <Link href="https://github.com/probir-sarkar/toolbox" target="_blank">
                            GitHub
                        </Link>
                    </Button>
                    <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800">
                        Support Project
                    </Button>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6 text-slate-900" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetTitle className="text-left flex items-center gap-2 font-bold text-xl mb-6">
                                <Layers className="w-5 h-5 text-rose-600" /> Toolbox.
                            </SheetTitle>
                            <div className="flex flex-col gap-6">
                                <Link
                                    href="/"
                                    onClick={() => setIsOpen(false)}
                                    className={cn("text-lg font-medium transition-colors hover:text-rose-600", pathname === "/" ? "text-rose-600" : "text-slate-600")}
                                >
                                    Home
                                </Link>

                                <div className="space-y-4">
                                    <h4 className="font-medium text-slate-900 border-b pb-2">Tools</h4>
                                    {tools.map(tool => (
                                        <div key={tool.title} className="space-y-3 pl-2">
                                            <Link
                                                href={tool.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block font-medium text-slate-800 hover:text-rose-600"
                                            >
                                                {tool.title}
                                            </Link>
                                            <div className="pl-4 space-y-2 border-l-2 border-slate-100">
                                                {tool.items.map(item => (
                                                    <Link
                                                        key={item.title}
                                                        href={item.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className="block text-sm text-slate-500 hover:text-rose-600"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-slate-100">
                                    <Button className="w-full bg-slate-900 text-white mb-2">Support Project</Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
