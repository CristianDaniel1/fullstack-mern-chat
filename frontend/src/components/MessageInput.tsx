import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useChatStore } from '../store/chatStore.ts';

export const MessageInput = () => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const sendMessage = useChatStore(state => state.sendMessage);

  function handleChangeImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    if (!file.type.startsWith('image/')) {
      console.log('Por favor selecione uma imagem');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
    };

    reader.readAsDataURL(file);
  }

  function handleRemoveImage() {
    setImagePreview(null);
  }

  function handleSendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!text.trim() && !imagePreview) return;

    const send = async () => {
      try {
        await sendMessage({ text: text.trim(), image: imagePreview! });

        setText('');
        setImagePreview(null);
      } catch (error) {
        console.log(error);
      }
    };

    send();
  }

  function handleChangeText(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  return (
    <div>
      {imagePreview && (
        <div>
          <img src={imagePreview} alt="Preview" />
          <button onClick={handleRemoveImage}>x</button>
        </div>
      )}

      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Escreva uma mensagem..."
          onChange={handleChangeText}
          value={text}
        />

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInput}
          onChange={handleChangeImage}
        />
        <button type="button" onClick={() => fileInput.current?.click()}>
          img
        </button>

        <button disabled={!text.trim() && !imagePreview}>Enviar</button>
      </form>
    </div>
  );
};
