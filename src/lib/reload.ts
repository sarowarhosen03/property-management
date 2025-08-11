"use server"

import { redirect } from "next/navigation"

export async function hardReload(path:string){
redirect(path)
}