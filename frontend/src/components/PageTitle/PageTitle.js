import React, { useEffect } from 'react'

export default function PageTitle({pagetitle}) {
  useEffect(() => {
    document.title = `Arush11 | ${pagetitle}`;
  });
  return (
    <></>
  )
}
