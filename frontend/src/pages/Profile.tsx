import { ChangeEvent, useState } from 'react';
import { useNavigateToLogin } from '../hooks/useNavigateToLogin.ts';
import { useAuthStore } from '../store/authStore.ts';

export const Profile = () => {
  useNavigateToLogin();
  const authUser = useAuthStore(state => state.authUser);
  const isUpdatingProfile = useAuthStore(state => state.isUpdatingProfile);
  const updateProfile = useAuthStore(state => state.updateProfile);
  const [selectedImg, setSelectedImg] = useState<null | string>(null);

  function handleChangeImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async () => {
      if (!reader.result) return;

      const base64Image = reader.result as string;

      setSelectedImg(base64Image);
      try {
        await updateProfile({ profilePic: base64Image });
      } catch (error) {
        console.error(error);
      }
    };

    reader.readAsDataURL(file);
  }

  return (
    <>
      <div className="min-h-screen paddding-x">
        <div>
          <h1 className="text-2xl font-semibold">Perfil</h1>
          <p>Informações do seu perfil</p>
        </div>
        <section>
          <div className="size-24">
            <img
              src={selectedImg || authUser?.profilePic || ''}
              alt="Foto de perfil"
            />
          </div>
          <label htmlFor="profile-image">
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              onChange={handleChangeImage}
              disabled={isUpdatingProfile}
              aria-label="Alterar foto de perfil"
            />
          </label>
          <p>
            {isUpdatingProfile
              ? 'Atualizando...'
              : 'Clique no icone de câmera acima para atualizar a foto'}
          </p>
        </section>
        <section>
          <div>
            <div>
              <p>Nome completo: {authUser?.fullName}</p>
            </div>
            <div>
              <p>Email: {authUser?.email}</p>
            </div>
          </div>
          <div>
            <h2>Informações da conta</h2>
            <div>
              <p>Entrou em {authUser?.createdAt?.split('T')[0]}</p>
            </div>
            <div>
              <p>Status da conta ativa</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
