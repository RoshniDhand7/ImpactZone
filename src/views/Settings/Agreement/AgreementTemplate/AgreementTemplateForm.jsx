import React from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import PageBuilder from '../../../../shared/PageBuilder/PageBuilder';
import { useParams } from 'react-router-dom';

export default function AgreementTemplateForm() {
    const { id } = useParams();
    return (
        <div>
            <FormPage backText="Agreement Template">
                <PageBuilder id={id} />
            </FormPage>
        </div>
    );
}
