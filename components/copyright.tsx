import React, { memo } from 'react'
import Link from 'next/link'

const Copyright = ({ currentYear = new Date().getFullYear() }) => (
  <div className="copyright">
    &copy; Copyright 2017 - {currentYear} | JobRapide | Tous Droits Réservés. |
    Développé par :&nbsp;
    <Link href="https://ktekdesign.com" title="Ktekdesign" target="_blank">
      KTEKDESIGN
    </Link>
  </div>
)

export default memo(Copyright)
