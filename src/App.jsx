import "./App.css";
import { Outlet } from "react-router-dom";
import AppFrame from "./Layouts/AppFrame";

export default function App() {
  return (
    <AppFrame>
      <main className="relative min-h-dvh bg-[linear-gradient(-25deg,#134e4a,#000000)]">
        <Outlet />
      </main>
    </AppFrame>
  );
}
/* ---------------------------------------------------- */
/*                       NOTES                          */
/* ---------------------------------------------------- */
/*
1. View => Component => Fungsi yang mereturn HTML
2. Nama component harus ditulis menggunakan PascalCase
3. Component harus diexport untuk bisa ditampilkan
4.Tidak bisa mereturn lebih dari 1 element html, jdi mesti dibungkus, cont : pake div
*/
