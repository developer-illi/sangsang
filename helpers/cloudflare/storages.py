from storages.backends.s3 import S3Storage

class StaticStorage(S3Storage):
    # helpers.cloudflare.storages.StaticStorage
    location = "static"

    def _save(self, name, content):
        # MIME 타입 강제 설정
        if name.endswith('.woff2'):
            content.content_type = 'font/woff2'
        elif name.endswith('.woff'):
            content.content_type = 'font/woff'
        elif name.endswith('.otf'):
            content.content_type = 'font/otf'
        elif name.endswith('.ttf'):
            content.content_type = 'font/ttf'

        # 부모 클래스의 _save 메서드 호출
        return super()._save(name, content)

class MediaStorage(S3Storage):
    # helpers.cloudflare.storages.MediaStorage
    location = "media"

class ProtectedStorage(S3Storage):
    # helpers.cloudflare.storages.MediaStorage
    location = "protected"