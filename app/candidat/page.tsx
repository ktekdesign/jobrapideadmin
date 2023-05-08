'use client';
import { Title, Text } from '@tremor/react';
import PostsList from '../../components/post-list';
import Toast from '../../components/toast';
import useResource from '@hooks/useResource';
import Loading from '../loading';
import ProfileCandidat from '@components/profile/candidat';


export default function IndexPage() {
    return (
      <>
        <Title>Profil</Title>
        <ProfileCandidat />
        <Toast text="Rendez votre profil visible aux recruteurs." title='Sponsoriser' link='/candidat/sponsor' />
      </>
    );
}
