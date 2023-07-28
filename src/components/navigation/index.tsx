"use client"
import { DefaultLangs } from "@/config/languaje";
import { useAppData } from '@/context';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LinksList } from './elements';
import './style.scss';

const Navigation = () => {
    const { lang, changeData } = useAppData();
    const pathName = usePathname();
    const [active, setActive] = useState<string>(pathName);

    useEffect(()=>{
        setActive(pathName);
    },[pathName]);

    const ChangeLang = (languaje: string) => {
        changeData(languaje);
    }

    return(
        <nav className="navigation">
            <figure className="navigation__figure">
                <Image className="navigation__figure__image" src="/logos/white_logo_color_background.jpg" alt="Logo" width={340} height={141} />
            </figure>
            <ul className="navigation__list">
                {
                    LinksList.map((item, index) => {
                        return(
                            <li
                                className={active===item.path ? "navigation__list__item active" : "navigation__list__item"}
                                key={index}
                            >
                                <Link className="navigation__list__item__link" href={`${item.path}`} > {item.name} </Link>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="navigation__language">
                {
                    DefaultLangs.map((item, index) => {
                        return(
                            <button
                                className={lang===item ? "navigation__language__item active" : "navigation__language__item"}
                                onClick={()=>{ChangeLang(item)}}
                                key={index}
                            >
                                {item}
                            </button>
                        )
                    })
                }
            </div>
        </nav>
    )
}

export default Navigation;