import { Role } from "types/data"
import ProfileCandidat from "./candidat"
import ProfileRecruteur from "./recruteur"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"

const Profil = ({role, jwtAuthToken} : {role: Role, jwtAuthToken?: string}) => {
    const [message, setMessage] = useState("")
    
    useEffect(() => {
        if(message === "Ok") redirect("/?newUser=true")
    }, [message])
    
    return (
        <>
            {role === "recruteur" ? 
                <ProfileRecruteur jwtAuthToken={jwtAuthToken} setMessage={setMessage} />
            :
                <ProfileCandidat jwtAuthToken={jwtAuthToken} setMessage={setMessage} />
            }
        </>
    )
}
export default Profil