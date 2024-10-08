"use client"; // Asegúrate de tener esto si usas Next.js

import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import { HiBars3BottomRight } from "react-icons/hi2";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Maneja el desplazamiento suave al hacer clic en los enlaces
  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();  // Prevenir el comportamiento por defecto del enlace
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });  // Desplazamiento suave
    }
  };


  // Manejar el scroll para cambiar el estado de la barra de navegación
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  // Alternar el menú de navegación
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // Efecto para agregar/quitar el evento del scroll en el componente
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Efecto para bloquear/desbloquear el scroll del fondo cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden'); // Bloquea el fondo
    } else {
      document.body.classList.remove('overflow-hidden'); // Desbloquea el fondo
    }

    // Cleanup para remover la clase cuando el componente se desmonte
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]); // Escucha los cambios en `isMenuOpen`

  
  
  return (
    <header className={`text-stone-700 py-4 shadow-sm z-30 fixed top-0 left-0 transition-all duration-100
              ${isScrolled ? 'bg-neutral-950' : ''} 
              ${isMenuOpen ? 'w-72 h-full bg-neutral-950' : 'w-full'} 
              ${isMenuOpen && !isScrolled ? 'w-72 bg-neutral-950' : ''}
            `}>
      <div className="container px-4 flex justify-between items-center max-w-7xl mx-auto">
        {/* Contenedor de Logo y Navegación (todo alineado a la izquierda) */}
        <div className="flex items-center space-x-8">
          {/* Logo con texto AG */}
          <div className="flex items-center text-2xl font-bold">
            <a href="/" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-10" /> {/* Coloca tu logo aquí */}
              <span className="ml-2 text-stone-200">AA</span> {/* Nombre AG al lado del logo */}
            </a>
          </div>

          {/* Opciones de Navegación alineadas al logo */}
          <nav className="hidden md:flex space-x-14">
            <a  onClick={(e) => handleSmoothScroll(e, 'home')} href="#home" className="text-1xl font-medium text-stone-200 hover:text-stone-300">Inicio</a>
            <a  onClick={(e) => handleSmoothScroll(e, 'product')} href="#about" className="text-1xl font-medium text-stone-200 hover:text-stone-300">Productos</a>
            <a  onClick={(e) => handleSmoothScroll(e, 'about')} href="#services" className="text-1xl font-medium text-stone-200 hover:text-stone-300">Sobre Nosotros</a>
            <a  onClick={(e) => handleSmoothScroll(e, 'contact')}href="#services" className="text-1xl font-medium text-stone-200 hover:text-stone-300">Contáctanos</a>
          </nav>
        </div>

        {/* Botón de Contacto alineado a la derecha */}
        <div className="hidden md:block">
          <a href="https://api.whatsapp.com/send?phone=5493884342648" className="font-semibold flex items-center justify-center order-1 w-full px-4 py-2 mt-3 text-sm tracking-wide capitalize transition-colors duration-300 transform border rounded-full sm:mx-2 dark:border-stone-100/50 text-stone-100 dark:hover:text-stone-600 sm:mt-0 sm:w-auto focus:outline-none focus:ring dark:hover:bg-stone-200 focus:ring-stone-200 focus:ring-opacity-40">
                Mensaje Directo
          </a>
        </div>

        {/* Botón de Menú para Móviles */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-stone-200 focus:outline-none"
          >
            {isMenuOpen ? <IoClose size={28} /> : <HiBars3BottomRight size={28} />} {/* Iconos de hamburguesa y close */}
          </button>
        </div>
      </div>
      {/* Menú para Móviles */}
      {isMenuOpen  && (
        <div className="md:hidden z-30">
          <nav className="flex flex-col items-center space-y-4 py-4 bg-stone-950 text-stone-200 transition-all duration-100">
            <a onClick={(e) => { e.preventDefault();handleSmoothScroll(e, 'home');toggleMenu();}} href="#home" className="text-lg hover:text-stone-300">Inicio</a>
            <a onClick={(e) => { e.preventDefault();handleSmoothScroll(e, 'product');toggleMenu();}}  href="#about" className="text-lg hover:text-stone-300" >Productos</a>
            <a onClick={(e) => { e.preventDefault();handleSmoothScroll(e, 'about');toggleMenu();}}  href="#about" className="text-lg hover:text-stone-300" >Sobre Nosotros</a>
            <a onClick={(e) => { e.preventDefault();handleSmoothScroll(e, 'contact');toggleMenu();}}  href="#services" className="text-lg hover:text-stone-300" >Contáctanos</a>
            <a
              href="https://api.whatsapp.com/send?phone=5493884342648"
              className="font-semibold px-4 py-2 mt-3 text-sm tracking-wide capitalize transition-colors duration-300 transform border rounded-full sm:mx-2 dark:border-stone-100/50 text-stone-100 dark:hover:text-stone-600 sm:mt-0 sm:w-auto focus:outline-none focus:ring dark:hover:bg-stone-200 focus:ring-stone-200 focus:ring-opacity-40"
            >
              Mensaje Directo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
