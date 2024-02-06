from rest_framework import serializers

class AccessTokenSerializer(serializers.Serializer):
    access_token = serializers.CharField()
    token_type = serializers.CharField()
    scope = serializers.CharField()
    expires_in = serializers.IntegerField()
    refresh_token = serializers.CharField()

class IsAuthenticatedSerializer(serializers.Serializer):
    status = serializers.BooleanField()

class ImageSerializer(serializers.Serializer):
    url = serializers.URLField()
    height = serializers.IntegerField()
    width = serializers.IntegerField()

class ExternalUrlsSerializer(serializers.Serializer):
    spotify = serializers.URLField()

class FollowersSerializer(serializers.Serializer):
    href = serializers.URLField()
    total = serializers.IntegerField()

class OwnerSerializer(serializers.Serializer):
    external_urls = ExternalUrlsSerializer()
    followers = FollowersSerializer()
    href = serializers.URLField()
    id = serializers.CharField()
    type = serializers.CharField()
    uri = serializers.CharField()
    display_name = serializers.CharField()

class ArtistSerializer(serializers.Serializer):
    external_urls = serializers.DictField(child=serializers.URLField())
    href = serializers.URLField()
    id = serializers.CharField()
    name = serializers.CharField()
    type = serializers.CharField()
    uri = serializers.CharField()

class AlbumSerializer(serializers.Serializer):
    available_markets = serializers.ListField(child=serializers.CharField())
    type = serializers.CharField()
    album_type = serializers.CharField()
    href = serializers.URLField()
    id = serializers.CharField()
    images = ImageSerializer(many=True)
    name = serializers.CharField()
    release_date = serializers.DateField()
    release_date_precision = serializers.CharField()
    uri = serializers.CharField()
    artists = ArtistSerializer(many=True)
    external_urls = serializers.DictField(child=serializers.URLField())
    total_tracks = serializers.IntegerField()

class TrackSerializer(serializers.Serializer):
    preview_url = serializers.URLField()
    available_markets = serializers.ListField(child=serializers.CharField())
    explicit = serializers.BooleanField()
    type = serializers.CharField()
    episode = serializers.BooleanField()
    track = serializers.BooleanField()
    album = AlbumSerializer()
    artists = ArtistSerializer(many=True)
    disc_number = serializers.IntegerField()
    track_number = serializers.IntegerField()
    duration_ms = serializers.IntegerField()
    external_ids = serializers.DictField(child=serializers.CharField())
    external_urls = serializers.DictField(child=serializers.URLField())
    href = serializers.URLField()
    id = serializers.CharField()
    name = serializers.CharField()
    popularity = serializers.IntegerField()
    uri = serializers.CharField()
    is_local = serializers.BooleanField()

class PlaylistSerializer(serializers.Serializer):
    href = serializers.URLField()
    limit = serializers.IntegerField()
    next = serializers.URLField()
    offset = serializers.IntegerField()
    previous = serializers.URLField()
    total = serializers.IntegerField()
    items = TrackSerializer(many=True)
    collaborative = serializers.BooleanField()
    description = serializers.CharField()
    external_urls = ExternalUrlsSerializer()
    followers = FollowersSerializer()
    href = serializers.URLField()
    id = serializers.CharField()
    images = ImageSerializer(many=True)
    name = serializers.CharField()
    owner = OwnerSerializer()
    public = serializers.BooleanField()
    snapshot_id = serializers.CharField()
    type = serializers.CharField()
    uri = serializers.CharField()
