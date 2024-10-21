import { useState } from 'react';
import { useLoaderData, Form, useSubmit } from 'react-router-dom';
import ElephantPhotoManager from '../ElephantPhotos/ElephantphotoManager';
import { Photo } from '../../../types';
import styles from './Show.module.scss';

function Show() {
  const [isEditing, setIsEditing] = useState(false);
  const [finalPhotos, setFinalPhotos] = useState<Photo[]>([]); // Track the final photos submitted
  const submit = useSubmit();

  type ElephantData = {
    id: string;
    type: string;
    attributes: {
      can_edit: boolean;
      id: number;
      name: string;
      bio: string;
      user_id: number;
      photos: { id: string; url: string }[];
    };
  };

  const { elephant } = useLoaderData() as { elephant: { data: ElephantData } };
  const { name, bio } = elephant.data.attributes;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);

    // Append final photos to the formData
    finalPhotos.forEach((photo, index) => {
      if (photo.status === "new" && photo.file) {
        formData.append(`photos[new][${index}]`, photo.file);
      } else if (photo.status === "deleted" && photo.id !== null) {
        formData.append(`photos[deleted][]`, String(photo.id));
      }
    });

    // Submit the formData
    submit(formData, { method: 'PATCH', encType: 'multipart/form-data' });
    setIsEditing(false);
  };

  return (
    <div>
      {elephant.data.attributes.can_edit && (
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Stop Editing' : 'Start Editing'}
        </button>
      )}

      <Form method="PATCH" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          {isEditing ? (
            <input type="text" id="name" name="name" defaultValue={name} required />
          ) : (
            <span>{name}</span>
          )}
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          {isEditing ? (
            <input type="text" id="bio" name="bio" defaultValue={bio} required />
          ) : (
            <span>{bio}</span>
          )}
        </div>

        <ElephantPhotoManager
          initialPhotos={elephant.data.attributes.photos}
          isEditing={isEditing}
          onSubmitPhotos={setFinalPhotos} // Get the final photos when the form is submitted
        />

        {isEditing && <button type="submit">Update Elephant</button>}
      </Form>

      {isEditing && (
        <Form method="delete">
          <button type="submit">Delete</button>
        </Form>
      )}
    </div>
  );
}

export default Show;