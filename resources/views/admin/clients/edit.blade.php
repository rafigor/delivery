@extends('app')

@section('content')
    <div class="container">
        <h3>Editando cliente: <i>{{$client->user->name}}</i></h3>

        @include('errors._check')

        {!! Form::model($client, ['route'=>['admin.clients.update', $client->id]]) !!}

        @include('admin.clients._form')

        <div class='form-group'>
            {!! Form::submit('Salvar', ['class'=>'btn btn-primary']) !!}
        </div>

        {!! Form::close() !!}
    </div>
@endsection